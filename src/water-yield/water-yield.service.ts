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
import { countInRange } from 'src/utils/checkYield';

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

  async findAll(roles: string[]) {
    if (roles.includes(UserRole.ADMIN)) {
      const data = await this.waterYieldRepository.find();
      return data;
    } else {
      const data = await this.waterYieldRepository.find({
        where: {
          isDel: false,
        },
      });
      return data;
    }
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

  remove(idList: number[]) {
    idList.forEach(async (id) => {
      await this.waterYieldRepository.delete(id)
    })
    return '';
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

  async getWaterYieldToBashboard() {
    const allData = await this.findAll([UserRole.ADMIN]),
      supply = allData.map(item => item.supply),
      storage = allData.map(item => item.storage);
    const standard = [
      {
        start: 1,
        end: 100
      },
      {
        start: 100,
        end: 120
      },
      {
        start: 120,
        end: 140
      },
      {
        start: 140,
        end: 160
      },
      {
        start: 160,
        end: 180
      },
      {
        start: 180,
        end: 200
      },
    ]
    let supplyLine = [], storageLine = [], supplyCount = 0, storageCount = 0;
    standard.forEach((item) => {
      supplyCount += countInRange(supply, item.start, item.end)
      supplyLine.push(supplyCount);
      storageCount += countInRange(storage, item.start, item.end)
      storageLine.push(storageCount);
    })
    supplyLine.push(supply.length - supplyCount);
    storageLine.push(storage.length - storageCount);
    return {
      storageLine,
      supplyLine
    }
  }
}
