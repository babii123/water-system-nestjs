import { Test, TestingModule } from '@nestjs/testing';
import { SupplyPlanController } from './supply-plan.controller';
import { SupplyPlanService } from './supply-plan.service';

describe('SupplyPlanController', () => {
  let controller: SupplyPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplyPlanController],
      providers: [SupplyPlanService],
    }).compile();

    controller = module.get<SupplyPlanController>(SupplyPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
