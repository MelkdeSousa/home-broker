import { Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { AssetsService } from './assets.service'
import {
  ASSET_PRICE_CHANGED,
  JOIN_ASSET,
  JOIN_ASSETS,
  JoinLeaveAssetDto,
  JoinLeaveAssetsDto,
  LEAVE_ASSET,
  LEAVE_ASSETS,
} from './dto/events'
import { Asset } from './entities/asset.entity'

@WebSocketGateway({ cors: true })
export class AssetsGateway implements OnGatewayInit {
  private readonly logger = new Logger(AssetsGateway.name)
  private _server: Server

  constructor(private readonly assetsService: AssetsService) {}

  @OnEvent(ASSET_PRICE_CHANGED)
  handlePriceChange(asset: Asset) {
    this.logger.log(`Price changed for asset ${asset.symbol}`)
    this._server.to(asset.symbol).emit(ASSET_PRICE_CHANGED, asset)
  }

  afterInit(server: Server) {
    this.assetsService.onPriceChange()
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
  handleJoinAsset(client: Socket, payload: string) {
    const asset = JSON.parse(payload) as JoinLeaveAssetDto
    if (!asset.symbol) {
      return
    }

    client.join(asset.symbol)
    this.logger.log(`Client ${client.id} joined asset ${asset.symbol}`)
  }

  @SubscribeMessage(LEAVE_ASSETS)
  handleLeaveAssets(client: Socket, payload: string) {
    const assets = JSON.parse(payload) as JoinLeaveAssetsDto
    if (!assets.symbols?.length) {
      return
    }

    assets.symbols.forEach((symbol) => {
      client.leave(symbol)
    })

    this.logger.log(
      `Client ${client.id} left assets ${assets.symbols.join(', ')}`,
    )
  }

  @SubscribeMessage(LEAVE_ASSET)
  handleLeaveAsset(client: Socket, payload: string) {
    const asset = JSON.parse(payload) as JoinLeaveAssetDto
    if (!asset.symbol) {
      return
    }

    client.leave(asset.symbol)
    this.logger.log(`Client ${client.id} left asset ${asset.symbol}`)
  }
}
