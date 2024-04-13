export class CreateWaterQualityDto {
  resourceId: number
  addTime: Date
  detectTime: Date
  detectPeople: string[]
  addUser: string
  ph: number
  turbidity: number
  fluoride: number
  cyanin: number
  isDel: boolean
  delReason: string
}
