export class CreateNoticeDto {
  id: number;
  type: string;
  info: string;
  sendId: string;
  receiveId: string;
  time: Date;
  isRead: boolean;
}
