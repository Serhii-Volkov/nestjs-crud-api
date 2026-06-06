import { Controller, Post, Body, HttpStatus, HttpCode, Res, Req, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest } from './dto/register.dto';
import { LoginRequest } from './dto/login.dto';
import type { Request, Response} from 'express';
import { ApiBadRequestResponse, ApiConflictResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthResponse } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Authorization } from './decorators/authorization.decorator';
import { Authorized } from './decorators/authorizaed.decorator';
import type { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({type: AuthResponse})
  @ApiBadRequestResponse({description: 'Некоректные входные данные'})
  @ApiConflictResponse({description: 'Пользователь с таким email уже существует'})
  @ApiUnauthorizedResponse({description: 'Неверный email или пароль'})
  @ApiOperation({ summary: 'Register a new user', description: 'Registers a new user with the provided name, email, and password. Returns access and refresh tokens.' })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Res({passthrough: true}) res: Response, @Body() dto: RegisterRequest) {
    return await this.authService.register(res, dto)
  }

  @ApiOkResponse({type: AuthResponse})
  @ApiBadRequestResponse({description: 'Некоректные входные данные'})
  @ApiUnauthorizedResponse({description: 'Неверный email или пароль'})
  @ApiOperation({ summary: 'Login a user', description: 'Logs in a user with the provided email and password. Returns access and refresh tokens.' })
  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  async login(@Res({passthrough: true}) res: Response, @Body() dto: LoginRequest) {
    return await this.authService.login(res, dto) 
  }

  @ApiOkResponse({type: AuthResponse})
  @ApiOperation({ summary: 'Refresh tokens', description: 'Refreshes the access token using the refresh token stored in the cookie. Returns a new access token.' }) 
  @Post('refresh')
  @HttpCode(HttpStatus.CREATED)
  async refresh(@Req() req: Request, @Res({passthrough: true}) res: Response) {
    return this.authService.refresh(res, req);
  }
    
  @ApiOkResponse({type: AuthResponse})
  @ApiOperation({ summary: 'Logout a user', description: 'Logs out the current user and invalidates the refresh token.' })
  @Post('logout')
  @HttpCode(HttpStatus.CREATED)
  async logout(@Res({passthrough: true}) res: Response) {
    return await this.authService.logout(res);
  }

  @Authorization()
  @Get('@me')
  @HttpCode(HttpStatus.OK)
  async me(@Authorized() user: User) {
    return user
  }
}
