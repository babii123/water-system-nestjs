import { Test, TestingModule } from '@nestjs/testing';
import { WaterPriceController } from './water-price.controller';
import { WaterPriceService } from './water-price.service';

describe('WaterPriceController', () => {
  let controller: WaterPriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterPriceController],
      providers: [WaterPriceService],
    }).compile();

    controller = module.get<WaterPriceController>(WaterPriceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
