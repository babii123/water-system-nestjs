import { Test, TestingModule } from '@nestjs/testing';
import { WaterYieldController } from './water-yield.controller';
import { WaterYieldService } from './water-yield.service';

describe('WaterYieldController', () => {
  let controller: WaterYieldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterYieldController],
      providers: [WaterYieldService],
    }).compile();

    controller = module.get<WaterYieldController>(WaterYieldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
