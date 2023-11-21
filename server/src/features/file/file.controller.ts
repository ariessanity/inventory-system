import { Controller, Get, Post, Body, Patch, Param, Delete, Header, Res, Query } from '@nestjs/common';
import { FileService } from './file.service';
import { Response, Request } from 'express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('report/download')
  @Header(`Content-Type`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64')
  async downloadReport(@Body() data: any, @Res() res: Response) {
    let result = await this.fileService.downloadExcel(data);
    res.download(`${result}`);
  }

  @Post('report/dlProductSoldReport')
  @Header(`Content-Type`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64')
  async dlProductSoldReport(@Body() data: any, @Query() query: Request['query'], @Res() res: Response) {
    let result = await this.fileService.dlProductSoldReport(data, query);
    res.download(`${result}`);
  }

  @Post('report/dlTransactionHistoryReport')
  @Header(`Content-Type`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64')
  async dlTransactionHistoryReport(@Body() data: any, @Query() query: Request['query'], @Res() res: Response) {
    let result = await this.fileService.dlTransactionHistoryReport(data, query);
    res.download(`${result}`);
  }
}
