export class CreateSupplyPlanDto {
  addTime: Date;
  startTime: Date;
  endTime: Date;
  waterSources: string[];
  waterArea: string;
  waterPriceType: string;
  description: string;
  addUser: string;
  isDel: boolean;
  delReason: string;
}
