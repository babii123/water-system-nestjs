import { Test, TestingModule } from '@nestjs/testing';
import { WaterPriceService } from './water-price.service';

describe('WaterPriceService', () => {
  let service: WaterPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaterPriceService],
    }).compile();

    service = module.get<WaterPriceService>(WaterPriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
