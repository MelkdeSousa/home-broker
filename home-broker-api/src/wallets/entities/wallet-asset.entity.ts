import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { type HydratedDocument } from 'mongoose';
import { Asset, type AssetDocument } from 'src/assets/entities/asset.entity';
import { type WalletDocument } from './wallet.entity';

@Schema({ timestamps: true })
export class WalletAsset {
  @Prop({ type: mongoose.Schema.Types.Int32 })
  shares: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' })
  wallet: WalletDocument | string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Asset.name })
  asset: AssetDocument | string;

  createdAt!: Date;
  updatedAt!: Date;
}

export type WalletAssetDocument = HydratedDocument<WalletAsset>;

export const WalletAssetSchema = SchemaFactory.createForClass(WalletAsset);

WalletAssetSchema.index({ wallet: 1, asset: 1 }, { unique: true });
