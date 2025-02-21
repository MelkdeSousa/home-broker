import { Test, TestingModule } from '@nestjs/testing'
import { AssetDailiesService } from './asset-dailies.service'

describe('AssetDailiesService', () => {
  let service: AssetDailiesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetDailiesService],
    }).compile()

    service = module.get<AssetDailiesService>(AssetDailiesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
