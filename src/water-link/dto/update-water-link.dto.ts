import { PartialType } from '@nestjs/swagger';
import { CreateWaterLinkDto } from './create-water-link.dto';

export class UpdateWaterLinkDto extends PartialType(CreateWaterLinkDto) {}
