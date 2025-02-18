import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import type { CreateWalletAssetDto } from './dto/create-wallet-asset.dto';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletAsset } from './entities/wallet-asset.entity';
import { Wallet, type WalletDocument } from './entities/wallet.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name)
    private readonly walletModel: Model<WalletDocument>,
    @InjectModel(WalletAsset.name)
    private readonly walletAssetModel: Model<WalletAsset>,
  ) {}

  create(createWalletDto: CreateWalletDto) {
    return this.walletModel.create(createWalletDto);
  }

  findAll() {
    return this.walletModel.find();
  }

  findOne(id: string) {
    return this.walletModel.findById(id);
  }

  createWalletAsset({
    assetId: asset,
    walletId: wallet,
    shares,
  }: CreateWalletAssetDto) {
    return this.walletAssetModel.create({
      wallet,
      asset,
      shares,
    });
  }
}
