import { PartialType } from '@nestjs/swagger';
import { CreateWaterPriceDto } from './create-water-price.dto';

export class UpdateWaterPriceDto extends PartialType(CreateWaterPriceDto) {}
