import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { AssetDailiesService } from './asset-dailies.service'
import { CreateAssetDailyDto } from './dto/create-asset.dto'

@Controller('assets/:symbol/dailies')
export class AssetDailiesController {
  constructor(private readonly assetDailiesService: AssetDailiesService) {}

  @Get()
  findAll(
    @Param()
    symbol: string,
  ) {
    return this.assetDailiesService.findAll(symbol)
  }

  @Post()
  create(
    @Param()
    symbol: string,
    @Body()
    { date, price }: Omit<CreateAssetDailyDto, 'symbol'>,
  ) {
    return this.assetDailiesService.create({
      symbol,
      date: new Date(date),
      price,
    })
  }
}
