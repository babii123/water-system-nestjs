import { Injectable } from '@nestjs/common';
import { CreateSupplyPlanDto } from './dto/create-supply-plan.dto';
import { UpdateSupplyPlanDto } from './dto/update-supply-plan.dto';
import { In, Like, Repository } from 'typeorm';
import { SupplyPlan } from './entities/supply-plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { updateResult } from 'src/Result/JudgeResult';
import { UserRole } from 'src/user/entities/user.entity';
import { Code } from 'src/Result/Code';
import { Message } from 'src/Result/Message';

@Injectable()
export class SupplyPlanService {
  constructor(
    @InjectRepository(SupplyPlan)
    private readonly supplyPlanrRepository: Repository<SupplyPlan>,
  ) { }
  async create(createSupplyPlanDto: CreateSupplyPlanDto) {
    const supplyPlan = this.supplyPlanrRepository.create(createSupplyPlanDto);
    const res = this.supplyPlanrRepository.save(supplyPlan);
    return res;
  }

  async findAll(roles: string[]) {
    if (roles.includes(UserRole.ADMIN)) {
      const supplyPlans = await this.supplyPlanrRepository.find();
      return supplyPlans;
    } else{
      const supplyPlans = await this.supplyPlanrRepository.find({
        where: {
          isDel: false,
        },
      });
      return supplyPlans;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} supplyPlan`;
  }

  async findByCondition(waterArea?: string, waterPriceType?: string) {
    const data = await this.supplyPlanrRepository.find({
      where: {
        waterArea: waterArea ? Like(`%${waterArea}%`) : undefined,
        waterPriceType: waterPriceType ? Like(`%${waterPriceType}%`) : undefined,
        isDel: false
      }
    })
    return data
  }

  async update(id: number, updateSupplyPlanDto: UpdateSupplyPlanDto) {
    const res = await this.supplyPlanrRepository.update(
      { id },
      updateSupplyPlanDto,
    );
    return updateResult(res);
  }

  remove(idList: number[]) {
    idList.forEach(async (id) => {
      await this.supplyPlanrRepository.delete({ id })
    })
    return '';
  }

  async deleteByDelReason(id: number, delReason: string) {
    let water = await this.supplyPlanrRepository.findOne({ where: { id } });
    water.delReason = delReason;
    water.isDel = true;
    const res = await this.supplyPlanrRepository.update({ id }, water);
    return updateResult(res);
  }

  async getWaterToBashboard() {
    const planCount = await this.supplyPlanrRepository.count()
    return planCount;
  }

  async removeMulti(idList: number[], delReason: string, roles: string[]) {
    if (roles.includes(UserRole.ADMIN)) {
      const plans = await this.supplyPlanrRepository.find({
        where: { id: In(idList) },
      });
      const res = await this.supplyPlanrRepository.remove(plans);
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
}
