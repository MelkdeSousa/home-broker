import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { type HydratedDocument } from 'mongoose';
import { Asset, type AssetDocument } from 'src/assets/entities/asset.entity';
import {
  Wallet,
  type WalletDocument,
} from 'src/wallets/entities/wallet.entity';

export enum OrderType {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  FAILED = 'FAILED',
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: mongoose.Schema.Types.Int32 })
  shares: number;

  @Prop({ type: mongoose.Schema.Types.Int32 })
  partial: number;

  @Prop({ type: mongoose.Schema.Types.Int32 })
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Wallet.name })
  wallet: WalletDocument | string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Asset.name })
  asset: AssetDocument | string;

  @Prop({ type: String, enum: OrderType })
  type: OrderType;

  @Prop({ type: String, enum: OrderStatus })
  status: OrderStatus;

  createdAt!: Date;
  updatedAt!: Date;
}

export type OrderDocument = HydratedDocument<Order>;

export const OrderSchema = SchemaFactory.createForClass(Order);
