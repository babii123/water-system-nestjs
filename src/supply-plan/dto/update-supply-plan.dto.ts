import { PartialType } from '@nestjs/swagger';
import { CreateSupplyPlanDto } from './create-supply-plan.dto';

export class UpdateSupplyPlanDto extends PartialType(CreateSupplyPlanDto) {}
