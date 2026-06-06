import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket,  Server } from 'socket.io';

@WebSocketGateway(5001)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server!: Server

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
     console.log('Client connection', client.id) 
  }

  handleDisconnect(client: Socket) {
      console.log('Client disconected', client.id)
  }

  @SubscribeMessage('send')
  async handleMessage(@MessageBody() dto: any) {
    const message = await this.chatService.sendMessage(dto)
    this.server.emit('messages', message)

    return message
  }
}
