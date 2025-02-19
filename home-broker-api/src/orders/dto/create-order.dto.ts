import type { OrderType } from '../entities/order.entity'

export class CreateOrderDto {
  walletId: string
  assetId: string
  price: number
  shares: number
  partial: number
  type: OrderType
}
