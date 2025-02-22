import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Asset } from './asset.entity'

@Schema({ timestamps: true })
export class AssetDaily {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Asset.name })
  asset: Asset | string

  @Prop()
  price: number

  @Prop()
  date: Date
}

export type AssetDailyDocument = HydratedDocument<AssetDaily>

export const AssetDailySchema = SchemaFactory.createForClass(AssetDaily)
