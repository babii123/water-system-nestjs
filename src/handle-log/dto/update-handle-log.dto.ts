import { PartialType } from '@nestjs/swagger';
import { CreateHandleLogDto } from './create-handle-log.dto';

export class UpdateHandleLogDto extends PartialType(CreateHandleLogDto) {}
