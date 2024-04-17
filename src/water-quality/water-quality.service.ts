import { Injectable } from '@nestjs/common';
import { CreateWaterQualityDto } from './dto/create-water-quality.dto';
import { UpdateWaterQualityDto } from './dto/update-water-quality.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WaterQuality } from './entities/water-quality.entity';
import { In, Repository } from 'typeorm';
import { deleteResult, updateResult } from 'src/Result/JudgeResult';
import { Code } from 'src/Result/Code';
import { Message } from 'src/Result/Message';
import { UserRole } from 'src/user/entities/user.entity';
import checkQuality, { checkCyanin, checkFluoride, checkPH, checkTurbidity } from 'src/utils/checkQuality';

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

  async findAll(roles: string[]) {
    if (roles.includes(UserRole.ADMIN)) {
      const data = await this.waterQualityRepository.find();
      return data;
    } else {
      const data = await this.waterQualityRepository.find({
        where: {
          isDel: false,
        },
      });
      return data;
    }
  }

  async findOne(id: number) {
    const waterQuality = await this.waterQualityRepository.find({
      where: {
        id,
        isDel: false
      },
    });
    return waterQuality;
  }

  async update(id: number, updateWaterQualityDto: UpdateWaterQualityDto) {
    const res = await this.waterQualityRepository.update(
      { id },
      updateWaterQualityDto,
    );
    return updateResult(res);
  }

  remove(idList: number[]) {
    idList.forEach(async (id) => {
      await this.waterQualityRepository.delete({ id });
    })
    return '';
  }

  async removeMulti(idList: number[], delReason: string, roles: string[]) {
    if (roles.includes(UserRole.ADMIN)) {
      const waters = await this.waterQualityRepository.find({
        where: { id: In(idList) },
      });
      const res = await this.waterQualityRepository.remove(waters);
      return {
        code: res ? Code.DELETE_OK : Code.DELETE_ERR,
        msg: res ? Message.Del_Success : Message.Del_Fail,
        data: res,
      };
    } else {
      idList.forEach(async (id) => {
        await this.deleteByDelReason(id, delReason);
      })
    }
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

  async getWaterQualityToBashboard() {
    const allData = await this.findAll([UserRole.ADMIN]);
    console.log(allData);
    let phGood = 0, phBad = 0,
      turbidityGood = 0, turbidityBad = 0,
      fluorideGood = 0, fluorideBad = 0,
      cyaninGood = 0, cyaninBad = 0;
    allData.forEach((item) => {
      // ph,浑浊度，含氟，含氰
      if (checkPH(item.ph).result) {
        phBad += 1;
      } else {
        phGood += 1;
      }
      if (checkTurbidity(item.turbidity).result) {
        turbidityBad += 1;
      } else {
        turbidityGood += 1;
      }
      if (checkFluoride(item.fluoride).result) {
        fluorideBad += 1;
      } else {
        fluorideGood += 1;
      }
      if (checkCyanin(item.cyanin).result) {
        cyaninBad += 1;
      } else {
        cyaninGood += 1;
      }
    })

    return [
      [phGood, turbidityGood, fluorideGood, cyaninGood],
      [phBad, turbidityBad, fluorideBad, cyaninBad]
    ]
  }
}
