import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { CreateOrderDto } from './dto/create-order.dto'
import { CREATE_ORDER } from './dto/events'
import { OrdersService } from './orders.service'

@WebSocketGateway({ cors: true })
export class OrdersGateway {
  constructor(private readonly ordersService: OrdersService) {}

  @SubscribeMessage(CREATE_ORDER)
  async handleMessage(_client: Socket, payload: string) {
    const order = await this.ordersService.create(
      JSON.parse(payload) as CreateOrderDto,
    )
    return order
  }
}
