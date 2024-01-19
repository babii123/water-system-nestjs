import { Test, TestingModule } from '@nestjs/testing';
import { WaterYieldService } from './water-yield.service';

describe('WaterYieldService', () => {
  let service: WaterYieldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaterYieldService],
    }).compile();

    service = module.get<WaterYieldService>(WaterYieldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
