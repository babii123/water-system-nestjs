import { Injectable } from '@nestjs/common';
import { CreateWaterQualityDto } from './dto/create-water-quality.dto';
import { UpdateWaterQualityDto } from './dto/update-water-quality.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WaterQuality } from './entities/water-quality.entity';
import { In, Repository } from 'typeorm';
import { deleteResult, updateResult } from 'src/Result/JudgeResult';
import { Code } from 'src/Result/Code';
import { Message } from 'src/Result/Message';

@Injectable()
export class WaterQualityService {
  constructor(
    @InjectRepository(WaterQuality)
    private readonly waterQualityRepository: Repository<WaterQuality>,
  ) { }
  async create(createWaterQualityDto: CreateWaterQualityDto) {
    const waterQuality = this.waterQualityRepository.create(
      createWaterQualityDto,
    );
    const res = await this.waterQualityRepository.save(waterQuality);
    return res;
  }

  async findAll() {
    const data = await this.waterQualityRepository.find({
      where: {
        isDel: false,
      },
    });
    return data;
  }

  async findOne(id: number) {
    const waterQuality = await this.waterQualityRepository.find({
      where: {
        id,
        isDel: false
      },
    });
    console.log(id, waterQuality);
    return waterQuality;
  }

  async update(id: number, updateWaterQualityDto: UpdateWaterQualityDto) {
    const res = await this.waterQualityRepository.update(
      { id },
      updateWaterQualityDto,
    );
    return updateResult(res);
  }

  async remove(id: number) {
    const res = await this.waterQualityRepository.delete({ id });
    return deleteResult(res);
  }

  async removeMulti(idList: number[]) {
    const waters = await this.waterQualityRepository.find({
      where: { id: In(idList) },
    });
    const res = await this.waterQualityRepository.remove(waters);
    return {
      code: res ? Code.DELETE_OK : Code.DELETE_ERR,
      msg: res ? Message.Del_Success : Message.Del_Fail,
      data: res,
    };
  }

  async deleteByDelReason(id: number, delReason: string) {
    let waterQuality = await this.waterQualityRepository.findOne({
      where: { id },
    });
    waterQuality.delReason = delReason;
    waterQuality.isDel = true;
    const res = await this.waterQualityRepository.update({ id }, waterQuality);
    return updateResult(res);
  }
}
