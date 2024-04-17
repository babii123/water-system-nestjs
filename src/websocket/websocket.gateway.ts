// socket.gateway.ts

import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private clients = new Map<string, Socket>();

  handleConnection(client: Socket, ...args: any[]) {
    const userId = client.handshake.query.userId as string;
    this.clients.set(userId, client);
    console.log(`Client connected: ${userId}`);
  }

  handleDisconnect(client: Socket) {
    const userId = Array.from(this.clients.entries())
      .find(entry => entry[1] === client)?.[0];
    if (userId) {
      this.clients.delete(userId);
      console.log(`Client disconnected: ${userId}`);
    }
  }

  sendNotificationToUser(userId: string, notification: any) {
    const client = this.clients.get(userId);
    if (client) {
      client.emit('notification', notification);
    }
  }
}
