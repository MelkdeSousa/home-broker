import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import type { FindAllOrderDto } from './dto/find-all-order.dto';
import { Order, OrderStatus } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
  ) {}

  create({
    assetId: asset,
    walletId: wallet,
    ...createOrderDto
  }: CreateOrderDto) {
    return this.orderModel.create({
      asset,
      wallet,
      status: OrderStatus.PENDING,
      ...createOrderDto,
    });
  }

  findAll(filter: FindAllOrderDto) {
    return this.orderModel.find(filter);
  }

  findOne(id: string) {
    return this.orderModel.findById(id);
  }
}
