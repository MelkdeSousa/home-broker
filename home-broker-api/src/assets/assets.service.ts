import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateAssetDto } from './dto/create-asset.dto'
import { ASSET_PRICE_CHANGED } from './dto/events'
import { Asset, type AssetDocument } from './entities/asset.entity'
@Injectable()
export class AssetsService {
  constructor(
    @InjectModel(Asset.name)
    private readonly assetModel: Model<Asset>,
    private readonly eventEmitter: EventEmitter2,
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

  onPriceChange() {
    return this.assetModel
      .watch(
        [
          {
            $match: {
              $or: [{ operationType: 'update' }, { operationType: 'replace' }],
            },
          },
        ],
        {
          fullDocument: 'updateLookup',
          fullDocumentBeforeChange: 'whenAvailable',
        },
      )
      .on(
        'change',
        async (data: {
          fullDocument: AssetDocument
          fullDocumentBeforeChange: AssetDocument | null
        }) => {
          if (
            data.fullDocument?.price === data.fullDocumentBeforeChange?.price
          ) {
            return
          }
          const asset = await this.assetModel.findById(data.fullDocument._id)

          this.eventEmitter.emit(ASSET_PRICE_CHANGED, asset)
        },
      )
  }
}
