import { Test, TestingModule } from '@nestjs/testing';
import { SupplyPlanService } from './supply-plan.service';

describe('SupplyPlanService', () => {
  let service: SupplyPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplyPlanService],
    }).compile();

    service = module.get<SupplyPlanService>(SupplyPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
