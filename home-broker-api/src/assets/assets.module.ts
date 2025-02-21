import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { MongooseModule } from '@nestjs/mongoose'
import { AssetsController } from './assets.controller'
import { AssetsGateway } from './assets.gateway'
import { AssetsService } from './assets.service'
import { Asset, AssetSchema } from './entities/asset.entity'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Asset.name,
        schema: AssetSchema,
      },
    ]),
    EventEmitterModule.forRoot(),
  ],
  controllers: [AssetsController],
  providers: [AssetsService, AssetsGateway],
})
export class AssetsModule {}
