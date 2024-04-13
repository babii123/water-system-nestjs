import { Test, TestingModule } from '@nestjs/testing';
import { WaterLinkService } from './water-link.service';

describe('WaterLinkService', () => {
  let service: WaterLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaterLinkService],
    }).compile();

    service = module.get<WaterLinkService>(WaterLinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
