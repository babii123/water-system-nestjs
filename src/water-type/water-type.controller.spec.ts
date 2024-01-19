import { Test, TestingModule } from '@nestjs/testing';
import { WaterTypeController } from './water-type.controller';
import { WaterTypeService } from './water-type.service';

describe('WaterTypeController', () => {
  let controller: WaterTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterTypeController],
      providers: [WaterTypeService],
    }).compile();

    controller = module.get<WaterTypeController>(WaterTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
