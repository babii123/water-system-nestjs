import { Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import * as nodemailer from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from './entities/notice.entity';
import { Repository } from 'typeorm';
import { updateResult } from 'src/Result/JudgeResult';

@Injectable()
export class NoticeService {
  private transporter;
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>
  ) {
    // 创建 Nodemailer 的传输器配置
    this.transporter = nodemailer.createTransport({
      host: 'smtp.qq.com', // Outlook 的 SMTP 服务器地址
      port: 465, // Outlook 的 SMTP 端口号
      secure: true, // true for 465, false for other ports
      auth: {
        user: '2943867123@qq.com', // 发送邮件的邮箱
        pass: 'wkkdqbbfkzktdgec', // 发送邮件的邮箱密码或授权码
      },
    });
  }
  async create(createNoticeDto: CreateNoticeDto) {
    const notice = this.noticeRepository.create(createNoticeDto);
    const res = this.noticeRepository.save(notice);
    return res;
  }

  findAll() {
    return `This action returns all notice`;
  }

  async findOne(id: number) {
    const notice = await this.noticeRepository.findOne({
      where: {
        id
      }
    });
    return notice;
  }

  async findByReceiveId(receiveId: string) {
    const data = await this.noticeRepository.find({
      where: {
        receiveId
      }
    })
    return data;
  }

  async update(id: number) {
    const notice = await this.findOne(id);
    console.log(notice);
    if (!notice.isRead) {
      notice.isRead = true;
      const res = this.noticeRepository.update({ id }, notice);
      return updateResult(res);
    }
    return '';
  }

  remove(id: number) {
    return `This action removes a #${id} notice`;
  }

  async sendEmail(sendId: string, to: string, subject: string, text: string) {
    try {
      // 使用 transporter 发送邮件
      await this.transporter.sendMail({
        from: '2943867123@qq.com', // 发件人邮箱
        to, // 收件人邮箱
        subject, // 邮件主题
        text, // 邮件内容
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw error; // 如果发送邮件失败，抛出错误
    }
  }
}
