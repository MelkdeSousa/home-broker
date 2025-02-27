import { Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { AssetDailiesService } from './asset-dailies.service'
import { AssetsService } from './assets.service'
import {
  ASSET_DAILY_CREATED,
  ASSET_PRICE_CHANGED,
  JOIN_ASSET,
  JOIN_ASSETS,
  JoinLeaveAssetDto,
  JoinLeaveAssetsDto,
  LEAVE_ASSET,
  LEAVE_ASSETS,
} from './dto/events'
import { AssetDaily } from './entities/asset-daily.entity'
import { Asset } from './entities/asset.entity'

@WebSocketGateway({ cors: true })
export class AssetsGateway implements OnGatewayInit {
  private readonly logger = new Logger(AssetsGateway.name)
  private _server: Server

  constructor(
    private readonly assetsService: AssetsService,
    private readonly assetDailiesService: AssetDailiesService,
  ) {}

  @OnEvent(ASSET_PRICE_CHANGED)
  handlePriceChange(asset: Asset) {
    this.logger.log(`Price changed for asset ${asset.symbol}`)
    this._server.to(asset.symbol).emit(ASSET_PRICE_CHANGED, asset)
  }

  @OnEvent(ASSET_DAILY_CREATED)
  handleAssetDailyCreated(assetDaily: AssetDaily & { asset: Asset }) {
    this._server
      .to(assetDaily.asset.symbol)
      .emit(ASSET_DAILY_CREATED, assetDaily)
    this.logger.log(
      `Daily data created for asset ${assetDaily.asset.symbol} on ${assetDaily.date}`,
    )
  }

  afterInit(server: Server) {
    this.assetsService.onPriceChange()
    this.assetDailiesService.onCreate()
    this._server = server
  }

  @SubscribeMessage(JOIN_ASSETS)
  handleJoinAssets(client: Socket, payload: string) {
    const assets = JSON.parse(payload) as JoinLeaveAssetsDto
    if (!assets.symbols?.length) {
      return
    }

    assets.symbols.forEach((symbol) => {
      client.join(symbol)
    })

    this.logger.log(
      `Client ${client.id} joined assets ${assets.symbols.join(', ')}`,
    )
  }

  @SubscribeMessage(JOIN_ASSET)
  handleJoinAsset(client: Socket, payload: JoinLeaveAssetDto) {
    if (!payload.symbol) {
      return
    }

    client.join(payload.symbol)
    this.logger.log(`Client ${client.id} joined asset ${payload.symbol}`)
  }

  @SubscribeMessage(LEAVE_ASSETS)
  handleLeaveAssets(client: Socket, payload: JoinLeaveAssetsDto) {
    if (!payload.symbols?.length) {
      return
    }

    payload.symbols.forEach((symbol) => {
      client.leave(symbol)
    })

    this.logger.log(
      `Client ${client.id} left assets ${payload.symbols.join(', ')}`,
    )
  }

  @SubscribeMessage(LEAVE_ASSET)
  handleLeaveAsset(client: Socket, payload: JoinLeaveAssetDto) {
    if (!payload.symbol) {
      return
    }

    client.leave(payload.symbol)
    this.logger.log(`Client ${client.id} left asset ${payload.symbol}`)
  }
}
