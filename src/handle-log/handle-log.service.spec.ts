import { Test, TestingModule } from '@nestjs/testing';
import { HandleLogService } from './handle-log.service';

describe('HandleLogService', () => {
  let service: HandleLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HandleLogService],
    }).compile();

    service = module.get<HandleLogService>(HandleLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
