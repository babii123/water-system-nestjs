import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';

const headerName = {
  id: 'ID',
  roles: '角色',
  userId: '用户ID',
  realName: '真实姓名',
  accountName: '昵称',
  email: '邮箱',
  phone: '手机号',
  sex: '性别',
  birthday: '生日',
  addTime: '添加时间',
  waterSources: '水资源',
  waterArea: '供水区域',
  waterPriceType: '用水类型',
  description: '详情',
  addUser: '添加人',
  planTime: '计划时间',
  startTime: '开始时间',
  endTime: '结束时间',
  detectTime: '测量时间',
  detectPeople: '测量人员',
  supply: '供水量',
  storage: '库存量',
  resourceId: '水资源ID',
  type: '类型',
  waterName: '水资源',
  address: '区域',
  checkUser: '核查人员',
  turbidity: '浊度',
  ph: '酸碱度',
  fluoride: '含氟量',
}

@Injectable()
export class ExportService {
  async exportToExcel(data: any[], res: Response, fileName: string) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    const headerStyle = {
      font: { bold: true }, // 设置为加粗
      alignment: { vertical: 'middle', horizontal: 'center' } // 设置为垂直和水平居中
    };

    // 添加表头
    const headers = Object.keys(data[0]).filter((item) => !['isDel', 'delReason'].includes(item))
    const headerNames = headers.map((item) => headerName[item])
    worksheet.addRow(headerNames);
    worksheet.eachRow(row => {
      row.font = headerStyle.font;
      row.alignment = headerStyle.alignment;
    });
   
    // 添加数据
    data.forEach((record) => {
      const row = [];
      headers.forEach((header) => {
        row.push(record[header]);
      });
      worksheet.addRow(row);
    });

    // 设置 HTTP 响应头
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${fileName}.xlsx`,
    );

    // 将 Excel 数据写入响应流
    await workbook.xlsx.write(res);

    // 结束响应
    res.end();
  }
}
