import { PartialType } from '@nestjs/swagger';
import { CreateWaterQualityDto } from './create-water-quality.dto';

export class UpdateWaterQualityDto extends PartialType(CreateWaterQualityDto) {}
