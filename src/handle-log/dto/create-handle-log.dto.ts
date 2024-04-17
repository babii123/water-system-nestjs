export class CreateHandleLogDto {
  userId: string
  realName: string
  handle: string
  description: string
  time: Date
  
  constructor(userId: string, realName: string, handle: string, description: string) {
    this.userId = userId;
    this.realName = realName;
    this.handle = handle;
    this.description = description;
    this.time = new Date;
  }
}
