import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import { CreateAssetDto } from './dto/create-asset.dto'
import { Asset } from './entities/asset.entity'

@Injectable()
export class AssetsService {
  constructor(
    @InjectModel(Asset.name)
    private readonly assetModel: Model<Asset>,
  ) {}

  create(createAssetDto: CreateAssetDto) {
    return this.assetModel.create(createAssetDto)
  }

  findAll() {
    return this.assetModel.find()
  }

  findOne(symbol: string) {
    return this.assetModel.findOne({ symbol })
  }
}
