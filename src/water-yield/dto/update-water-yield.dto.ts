import { PartialType } from '@nestjs/swagger';
import { CreateWaterYieldDto } from './create-water-yield.dto';

export class UpdateWaterYieldDto extends PartialType(CreateWaterYieldDto) {}
