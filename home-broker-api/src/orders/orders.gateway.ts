import { Logger } from '@nestjs/common'
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { CREATE_ORDER, CreateOrderDto } from './dto/create-order.dto'
import { OrdersService } from './orders.service'

@WebSocketGateway(8081, { cors: true })
export class OrdersGateway {
  private readonly logger: Logger = new Logger(OrdersGateway.name)
  constructor(private readonly ordersService: OrdersService) {}

  @SubscribeMessage(CREATE_ORDER)
  async handleMessage(_client: Socket, payload: string) {
    const order = await this.ordersService.create(
      JSON.parse(payload) as CreateOrderDto,
    )
    return order
  }
}
