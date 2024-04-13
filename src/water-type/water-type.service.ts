import { Injectable } from '@nestjs/common';
import { CreateWaterTypeDto } from './dto/create-water-type.dto';
import { UpdateWaterTypeDto } from './dto/update-water-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WaterType } from './entities/water-type.entity';
import { In, Repository } from 'typeorm';
import { deleteResult, updateResult } from 'src/Result/JudgeResult';
import { Message } from 'src/Result/Message';
import { Code } from 'src/Result/Code';

@Injectable()
export class WaterTypeService {
  constructor(
    @InjectRepository(WaterType)
    private readonly waterTypeRepository: Repository<WaterType>,
  ) { }

  async create(createWaterTypeDto: CreateWaterTypeDto) {
    const waterType = this.waterTypeRepository.create(createWaterTypeDto);
    const res = await this.waterTypeRepository.save(waterType);
    return res;
  }

  async findAll() {
    const data = await this.waterTypeRepository.find();
    return data;
  }

  async findOne(type: string) {
    const res = await this.waterTypeRepository.find({
      where: { type },
    });
    return res;
  }

  async update(id: number, updateWaterTypeDto: UpdateWaterTypeDto) {
    const res = await this.waterTypeRepository.update(
      { id },
      updateWaterTypeDto,
    );
    return updateResult(res);
  }

  async remove(id: number) {
    const res = await this.waterTypeRepository.delete({ id });
    return deleteResult(res);
  }

  async removeMulti(idList: number[]) {
    const waterTypes = await this.waterTypeRepository.find({
      where: { id: In(idList) },
    });
    const res = await this.waterTypeRepository.remove(waterTypes);
    return {
      code: res ? Code.DELETE_OK : Code.DELETE_ERR,
      msg: res ? Message.Del_Success : Message.Del_Fail,
      data: res,
    };
  }
}
