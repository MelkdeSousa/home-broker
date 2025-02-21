import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { MongooseModule } from '@nestjs/mongoose'
import { AssetDailiesController } from './asset-dailies.controller'
import { AssetsController } from './assets.controller'
import { AssetsGateway } from './assets.gateway'
import { AssetsService } from './assets.service'
import { AssetDaily, AssetDailySchema } from './entities/asset-daily.entity'
import { Asset, AssetSchema } from './entities/asset.entity'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Asset.name,
        schema: AssetSchema,
      },
      {
        name: AssetDaily.name,
        schema: AssetDailySchema,
      },
    ]),
    EventEmitterModule.forRoot(),
  ],
  controllers: [AssetsController, AssetDailiesController],
  providers: [AssetsService, AssetsGateway],
})
export class AssetsModule {}
