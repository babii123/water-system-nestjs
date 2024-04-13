import { Injectable } from '@nestjs/common';
import { CreateWaterYieldDto } from './dto/create-water-yield.dto';
import { UpdateWaterYieldDto } from './dto/update-water-yield.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WaterYield } from './entities/water-yield.entity';
import { In, Repository } from 'typeorm';
import { deleteResult, updateResult } from 'src/Result/JudgeResult';
import { Code } from 'src/Result/Code';
import { Message } from 'src/Result/Message';
import { UserRole } from 'src/user/entities/user.entity';

@Injectable()
export class WaterYieldService {
  constructor(
    @InjectRepository(WaterYield)
    private readonly waterYieldRepository: Repository<WaterYield>,
  ) { }
  async create(createWaterYieldDto: CreateWaterYieldDto) {
    const waterYield = this.waterYieldRepository.create(createWaterYieldDto);
    const res = await this.waterYieldRepository.save(waterYield);
    return res;
  }

  async findAll() {
    const data = await this.waterYieldRepository.find({
      where: {
        isDel: false,
      },
    });
    return data;
  }

  async findOne(id: number) {
    const waterYield = await this.waterYieldRepository.find({
      where: {
        id,
        isDel: false
      }
    });
    console.log(id, waterYield);
    return waterYield;
  }

  async update(id: number, updateWaterYieldDto: UpdateWaterYieldDto) {
    const res = await this.waterYieldRepository.update(
      { id },
      updateWaterYieldDto,
    );
    return updateResult(res);
  }

  async remove(id: number) {
    const res = await this.waterYieldRepository.delete(id);
    return deleteResult(res);
  }

  async removeMulti(idList: number[], delReason: string, roles: string[]) {
    if (roles.includes(UserRole.ADMIN)) {
      const waters = await this.waterYieldRepository.find({
        where: { id: In(idList) },
      });
      const res = await this.waterYieldRepository.remove(waters);
      return {
        code: res ? Code.DELETE_OK : Code.DELETE_ERR,
        msg: res ? Message.Del_Success : Message.Del_Fail,
        data: res,
      };
    } else {
      idList.forEach(async (id) => {
        await this.deleteByDelReason(id, delReason)
      })
    }
  }

  async deleteByDelReason(id: number, delReason: string) {
    let waterQuality = await this.waterYieldRepository.findOne({
      where: { id },
    });
    waterQuality.delReason = delReason;
    waterQuality.isDel = true;
    const res = await this.waterYieldRepository.update({ id }, waterQuality);
    return updateResult(res);
  }
}
