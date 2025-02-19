import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { type HydratedDocument } from 'mongoose'
import { WalletAsset, WalletAssetDocument } from './wallet-asset.entity'

@Schema({ timestamps: true })
export class Wallet {
  @Prop({
    type: [mongoose.Schema.Types.String],
    ref: WalletAsset.name,
    set: (v) => [...new Set(v)],
  })
  assets: WalletAssetDocument[] | string[]

  createdAt!: Date
  updatedAt!: Date
}

export type WalletDocument = HydratedDocument<Wallet>

export const WalletSchema = SchemaFactory.createForClass(Wallet)
