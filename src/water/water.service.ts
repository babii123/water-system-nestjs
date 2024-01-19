import { Injectable } from '@nestjs/common';
import { CreateWaterDto } from './dto/create-water.dto';
import { UpdateWaterDto } from './dto/update-water.dto';
import { In, Like, Repository } from 'typeorm';
import { Water } from './entities/water.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { deleteResult, updateResult } from 'src/Result/JudgeResult';
import { Code } from 'src/Result/Code';
import { Message } from 'src/Result/Message';

@Injectable()
export class WaterService {
  constructor(
    @InjectRepository(Water)
    private readonly waterRepository: Repository<Water>,
  ) { }
  async create(createWaterDto: CreateWaterDto) {
    const water = this.waterRepository.create(createWaterDto);
    const res = await this.waterRepository.save(water);
    return res;
  }

  async findAll() {
    const data = await this.waterRepository.find({
      where: {
        isDel: false,
      },
    });
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} water`;
  }

  async findByCondition(waterArea?: string, waterType?: string) {
    const data = await this.waterRepository.find({
      where: {
        address: waterArea ? Like(`%${waterArea}%`) : undefined,
        type: waterType ? waterType : undefined
      }
    })
    return data
  }

  async update(id: number, updateWaterDto: UpdateWaterDto) {
    const res = await this.waterRepository.update({ id }, updateWaterDto);
    return updateResult(res);
  }

  async remove(id: number) {
    const res = await this.waterRepository.delete({ id });
    return deleteResult(res);
  }

  async removeMulti(idList: number[]) {
    const waters = await this.waterRepository.find({
      where: { id: In(idList) },
    });
    const res = await this.waterRepository.remove(waters);
    return {
      code: res ? Code.DELETE_OK : Code.DELETE_ERR,
      msg: res ? Message.Del_Success : Message.Del_Fail,
      data: res,
    };
  }

  async deleteByDelReason(id: number, delReason: string) {
    let water = await this.waterRepository.findOne({ where: { id } });
    water.delReason = delReason;
    water.isDel = true;
    const res = await this.waterRepository.update({ id }, water);
    return updateResult(res);
  }

  async getWaterCountToBashboard() {
    const waterCount = await this.waterRepository.count()
    return waterCount
  }
}
