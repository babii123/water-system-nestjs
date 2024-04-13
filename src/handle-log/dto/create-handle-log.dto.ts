export class CreateHandleLogDto {
  userId: string
  realName: string
  handle: string
  description: string

  constructor(userId: string, realName: string, handle: string, description: string) {
    this.userId = userId;
    this.realName = realName;
    this.handle = handle;
    this.description = description;
  }
}
