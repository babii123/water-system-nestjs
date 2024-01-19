export class CreateWaterDto {
  type: string;
  waterName: string;
  address: string;
  description: string;
  addTime: Date;
  addUser: string;
  checkUser: string[];
  isDel: boolean;
  delReason: string;
}
