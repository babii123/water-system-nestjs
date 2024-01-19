import { PartialType } from '@nestjs/swagger';
import { CreateWaterTypeDto } from './create-water-type.dto';

export class UpdateWaterTypeDto extends PartialType(CreateWaterTypeDto) {}
