import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateAssetDailyDto } from './dto/create-asset.dto'
import { ASSET_DAILY_CREATED } from './dto/events'
import {
  AssetDaily,
  type AssetDailyDocument,
} from './entities/asset-daily.entity'
import { Asset } from './entities/asset.entity'

@Injectable()
export class AssetDailiesService {
  constructor(
    @InjectModel(AssetDaily.name)
    private readonly assetDailyModel: Model<AssetDaily>,
    @InjectModel(Asset.name)
    private readonly assetModel: Model<Asset>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async findAll(symbol: string) {
    const asset = await this.assetModel.findOne({ symbol })
    return this.assetDailyModel
      .find({ asset: asset?._id })
      .sort({ date: -1 })
      .populate('asset')
  }

  async create(assetDaily: CreateAssetDailyDto) {
    const asset = await this.assetModel.findOne({ symbol: assetDaily.symbol })
    return this.assetDailyModel.create({ ...assetDaily, asset: asset?._id })
  }

  onCreate() {
    this.assetDailyModel
      .watch(
        [
          {
            $match: {
              operationType: 'insert',
            },
          },
        ],
        {
          fullDocument: 'updateLookup',
        },
      )
      .on('change', async (data: { fullDocument: AssetDailyDocument }) => {
        const assetDaily = await this.assetDailyModel
          .findById(data.fullDocument._id)
          .populate('asset')

        this.eventEmitter.emit(ASSET_DAILY_CREATED, assetDaily)
      })
  }
}
