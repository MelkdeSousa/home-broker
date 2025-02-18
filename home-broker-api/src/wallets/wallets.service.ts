import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet, type WalletDocument } from './entities/wallet.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name)
    private readonly walletModel: Model<WalletDocument>,
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
}
