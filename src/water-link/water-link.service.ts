import { Injectable } from '@nestjs/common';
import { CreateWaterLinkDto } from './dto/create-water-link.dto';
import { UpdateWaterLinkDto } from './dto/update-water-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WaterLink } from './entities/water-link.entity';
import { Repository } from 'typeorm';
import { deleteResult } from 'src/Result/JudgeResult';

@Injectable()
export class WaterLinkService {
  constructor(
    @InjectRepository(WaterLink)
    private readonly waterLinkRepository: Repository<WaterLink>,
  ) { }

  async create(createWaterLinkDto: CreateWaterLinkDto) {
    const waterLink = this.waterLinkRepository.create(createWaterLinkDto);
    const res = await this.waterLinkRepository.save(waterLink);
    return res;
  }

  async findAll() {
    const data = await this.waterLinkRepository.find();
    return data;
  }

  async remove(id: number) {
    const res = await this.waterLinkRepository.delete({ id });
    return deleteResult(res);
  }
}
