import { Injectable } from '@nestjs/common';
import { CreateSupplyPlanDto } from './dto/create-supply-plan.dto';
import { UpdateSupplyPlanDto } from './dto/update-supply-plan.dto';
import { Like, Repository } from 'typeorm';
import { SupplyPlan } from './entities/supply-plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { deleteResult, updateResult } from 'src/Result/JudgeResult';

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

  async findAll() {
    const supplyPlans = await this.supplyPlanrRepository.find({
      where: {
        isDel: false,
      },
    });
    return supplyPlans;
  }

  findOne(id: number) {
    return `This action returns a #${id} supplyPlan`;
  }

  async findByCondition(waterArea?: string, waterPriceType?: string) {
    const data = await this.supplyPlanrRepository.find({
      where: {
        waterArea: waterArea ? Like(`%${waterArea}%`) : undefined,
        waterPriceType: waterPriceType ? waterPriceType : undefined
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

  async remove(id: number) {
    const res = await this.supplyPlanrRepository.delete({ id });
    return deleteResult(res);
  }

  async deleteByDelReason(id: number, delReason: string) {
    let water = await this.supplyPlanrRepository.findOne({ where: { id } });
    water.delReason = delReason;
    water.isDel = true;
    const res = await this.supplyPlanrRepository.update({ id }, water);
    return updateResult(res);
  }

  async getWaterToBashboard(){
    const planCount = await this.supplyPlanrRepository.count()
    return planCount;
  }
}
