import { Test, TestingModule } from '@nestjs/testing';
import { WaterTypeService } from './water-type.service';

describe('WaterTypeService', () => {
  let service: WaterTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaterTypeService],
    }).compile();

    service = module.get<WaterTypeService>(WaterTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
