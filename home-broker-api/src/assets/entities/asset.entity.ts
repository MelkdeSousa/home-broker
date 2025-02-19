import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import type { HydratedDocument } from 'mongoose'

@Schema({ timestamps: true })
export class Asset {
  @Prop({ unique: true, index: true })
  name: string

  @Prop({ unique: true, index: true })
  symbol: string

  @Prop()
  image: string

  @Prop()
  price: number

  createdAt!: Date
  updatedAt!: Date
}

export type AssetDocument = HydratedDocument<Asset>

export const AssetSchema = SchemaFactory.createForClass(Asset)
