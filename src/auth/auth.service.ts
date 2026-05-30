import { ConflictException, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterRequest } from './dto/register.dto'
import { hash, verify } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { JwtPayload } from './interfaces/jwt.interface';
import { LoginRequest } from './dto/login.dto';
import type { Response } from 'express';
import { isDev } from '../utils/is-dev.utils';


@Injectable()
export class AuthService {

    private readonly JWT_ACCESS_TOKEN_TTL: string
    private readonly JWT_REFRESH_TOKEN_TTL: string

    private readonly COOKIE_DOMAIN: string

    constructor(
        private readonly prisma: PrismaService, 
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {
        
        this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>('JWT_ACCESS_TOKEN_TTL')
        this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>('JWT_REFRESH_TOKEN_TTL')

        this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN')
    }

    async register(res: Response, dto: RegisterRequest) {
        const { name, email, password } = dto

        const userAlreadyExists = await this.prisma.user.findUnique({ where: {
            email
        }})

        if(userAlreadyExists) {
            throw new ConflictException('Пользователь с таким email уже существует')
        }

        const user = await this.prisma.user.create({data: {
            name, email, password: await hash(password)
        }})

       return this.generateTokens(user.id.toString());
    }

    async login(res: Response, dto: LoginRequest) {
        const { email, password } = dto

        const user = await this.prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                password: true
            }
        })

        if(!user) {
            throw new NotFoundException('Пользователь не найден')
        }

        const isValidPassword = await verify(user.password, password)

        if(!isValidPassword) {
            throw new NotFoundException('Пользователь с таким email не зарегистрирован')
        }

        return this.auth(res, user.id.toString())
    }


    private auth(res: Response, id: string) {
      const expires = new Date(
          Date.now() + Number(this.JWT_REFRESH_TOKEN_TTL)
      );

      const { accessToken, refreshToken } = this.generateTokens(id);

      this.setCookie(res, refreshToken, expires);

      return { accessToken };
    }


    private generateTokens(id: string) {
        const payload:  JwtPayload = { id}

        const accessToken = this.jwtService.sign(payload, {
            expiresIn: Number(this.JWT_ACCESS_TOKEN_TTL),
        })

        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: Number(this.JWT_REFRESH_TOKEN_TTL)
        })

        return {
            accessToken,
            refreshToken
        }
    }


    private setCookie(res: Response, value: string, expires: Date) {
        res.cookie('refreshToken', value, {
            httpOnly: true,
            domain: this.COOKIE_DOMAIN, // .google.com,
            expires,
            secure: !isDev(this.configService), // В продакшене куки должны передаваться только по HTTPS
            sameSite: !isDev(this.configService) ? 'none' : 'lax' // Защита от CSRF атак
        } )
    }


}
