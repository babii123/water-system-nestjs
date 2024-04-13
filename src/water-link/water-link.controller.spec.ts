import { Test, TestingModule } from '@nestjs/testing';
import { WaterLinkController } from './water-link.controller';
import { WaterLinkService } from './water-link.service';

describe('WaterLinkController', () => {
  let controller: WaterLinkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterLinkController],
      providers: [WaterLinkService],
    }).compile();

    controller = module.get<WaterLinkController>(WaterLinkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
