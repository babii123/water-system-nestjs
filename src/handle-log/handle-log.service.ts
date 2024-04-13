import { Injectable } from '@nestjs/common';
import { CreateHandleLogDto } from './dto/create-handle-log.dto';
import { UpdateHandleLogDto } from './dto/update-handle-log.dto';
import { HandleLog } from './entities/handle-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HandleLogService {
  constructor(
    @InjectRepository(HandleLog)
    private readonly handleLogRepository: Repository<HandleLog>
  ) { }
  async create(createHandleLogDto: CreateHandleLogDto) {
    const waterQuality = this.handleLogRepository.create(
      createHandleLogDto,
    );
    const res = await this.handleLogRepository.save(waterQuality);
    return res;
  }

  async findAll() {
    const res = await this.handleLogRepository.find();
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} handleLog`;
  }

  update(id: number, updateHandleLogDto: UpdateHandleLogDto) {
    return `This action updates a #${id} handleLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} handleLog`;
  }
}
