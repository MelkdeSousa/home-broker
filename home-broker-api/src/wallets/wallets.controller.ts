import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import type { CreateWalletAssetDto } from './dto/create-wallet-asset.dto'
import { CreateWalletDto } from './dto/create-wallet.dto'
import { WalletsService } from './wallets.service'

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletsService.create(createWalletDto)
  }

  @Get()
  findAll() {
    return this.walletsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletsService.findOne(id)
  }

  @Post(':id/assets')
  createAsset(
    @Param('id') id: string,
    @Body() createWalletAssetDto: Omit<CreateWalletAssetDto, 'walletId'>,
  ) {
    return this.walletsService.createWalletAsset({
      walletId: id,
      shares: createWalletAssetDto.shares,
      assetId: createWalletAssetDto.assetId,
    })
  }
}
