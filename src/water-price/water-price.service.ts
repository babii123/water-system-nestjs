import { Injectable } from '@nestjs/common';
import { CreateWaterPriceDto } from './dto/create-water-price.dto';
import { UpdateWaterPriceDto } from './dto/update-water-price.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WaterPrice } from './entities/water-price.entity';

@Injectable()
export class WaterPriceService {
  constructor(
    @InjectRepository(WaterPrice)
    private readonly waterPriceRepository: Repository<WaterPrice>
  ) { }
  async create(createWaterPriceDto: CreateWaterPriceDto) {
    const data = this.waterPriceRepository.create(createWaterPriceDto)
    const res = await this.waterPriceRepository.save(data)
    return res
  }

  async findAll() {
    const data = this.waterPriceRepository.find()
    return data
  }

  findOne(id: number) {
    return `This action returns a #${id} waterPrice`;
  }

  update(id: number, updateWaterPriceDto: UpdateWaterPriceDto) {
    return `This action updates a #${id} waterPrice`;
  }

  remove(id: number) {
    return `This action removes a #${id} waterPrice`;
  }

  async getWaterPriceToBashboard(){
    const waterPrice = await this.waterPriceRepository.find()
    const realPrices = {}
    const basicPrices = {}
    const pollutionCosts = {}
    const resourceCosts = {}
    waterPrice.forEach(item=>{
      realPrices[item.type] = item.realPrice 
      basicPrices[item.type] = item.basicPrice
      pollutionCosts[item.type] = item.pollutionCost
      resourceCosts[item.type] = item.resourceCost
    })
    return {
      realPrices,
      basicPrices,
      pollutionCosts,
      resourceCosts
    }
  }
}
