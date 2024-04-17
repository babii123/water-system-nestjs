export class CreateWaterPriceDto {
  type: string;
  basicPrice: number;
  resourceCost: number;
  pollutionCost: number;
  realPrice: number;

  constructor(type: string, basicPrice: number, resourceCost: number, pollutionCost: number, realPrice: number) {
    this.type = type;
    this.basicPrice = basicPrice;
    this.resourceCost = resourceCost;
    this.pollutionCost = pollutionCost;
    this.realPrice = realPrice;
  }
}