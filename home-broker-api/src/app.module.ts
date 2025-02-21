import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AssetDailiesService } from './assets/asset-dailies.service'
import { AssetsModule } from './assets/assets.module'
import { OrdersModule } from './orders/orders.module'
import { WalletsModule } from './wallets/wallets.module'

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:1234@localhost:27017/home_broker_api?authSource=admin&directConnection=true',
    ),
    AssetsModule,
    WalletsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AssetDailiesService],
})
export class AppModule {}
