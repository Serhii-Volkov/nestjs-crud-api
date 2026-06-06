import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class ChatService {
    constructor(private readonly prisma: PrismaService) {}

    async sendMessage(dto: SendMessageDto) {
        const {message} = dto

        const createMessage = await this.prisma.message.create({
            data: {
                message
            }
        })

        return createMessage 

    }
}
