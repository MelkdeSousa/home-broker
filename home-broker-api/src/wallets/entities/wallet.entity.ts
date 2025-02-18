import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { type HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Wallet {
  createdAt!: Date;
  updatedAt!: Date;
}

export type WalletDocument = HydratedDocument<Wallet>;

export const WalletSchema = SchemaFactory.createForClass(Wallet);
