export class CreateWaterYieldDto {
  resourceId: number;
  addTime: Date;
  addUser: string
  detectTime: Date;
  detectPeople: string[];
  supply: number;
  storage: number;
  isDel: boolean;
  delReason: string;
}
