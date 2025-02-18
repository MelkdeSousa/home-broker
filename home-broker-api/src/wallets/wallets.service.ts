import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import type { Connection, Model } from 'mongoose';
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
    @InjectConnection() private readonly connection: Connection,
  ) {}

  create(createWalletDto: CreateWalletDto) {
    return this.walletModel.create(createWalletDto);
  }

  findAll() {
    return this.walletModel.find();
  }

  findOne(id: string) {
    return this.walletModel.findById(id).populate([
      {
        path: 'assets',
        populate: 'asset',
      },
    ]);
  }

  async createWalletAsset({
    assetId: asset,
    walletId: wallet,
    shares,
  }: CreateWalletAssetDto) {
    const session = await this.connection.startSession();
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await session.startTransaction();
    try {
      const [walletAsset] = await this.walletAssetModel.create(
        [
          {
            wallet,
            asset,
            shares,
          },
        ],
        { session },
      );
      await this.walletModel.updateOne(
        {
          _id: wallet,
        },
        {
          $push: {
            assets: walletAsset._id,
          },
        },
        { session },
      );
      await session.commitTransaction();
      return walletAsset;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
}
