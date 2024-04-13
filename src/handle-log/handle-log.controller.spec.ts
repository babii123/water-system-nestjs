import { Test, TestingModule } from '@nestjs/testing';
import { HandleLogController } from './handle-log.controller';
import { HandleLogService } from './handle-log.service';

describe('HandleLogController', () => {
  let controller: HandleLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HandleLogController],
      providers: [HandleLogService],
    }).compile();

    controller = module.get<HandleLogController>(HandleLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
