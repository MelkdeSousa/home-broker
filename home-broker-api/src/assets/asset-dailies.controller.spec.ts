import { Test, TestingModule } from '@nestjs/testing'
import { AssetDailiesController } from './asset-dailies.controller'

describe('AssetDailiesController', () => {
  let controller: AssetDailiesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetDailiesController],
    }).compile()

    controller = module.get<AssetDailiesController>(AssetDailiesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
