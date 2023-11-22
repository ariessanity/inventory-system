import { Controller, Get, Post, Body, Patch, Param, Delete, Header, Res, Query, UseGuards } from '@nestjs/common';
import { FileService } from './file.service';
import { Response, Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/constants/role.enum';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('report/download')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Header(`Content-Type`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64')
  async downloadReport(@Body() data: any, @Res() res: Response) {
    let result = await this.fileService.downloadExcel(data);
    res.download(`${result}`);
  }

  @Post('report/dlProductSoldReport')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Header(`Content-Type`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64')
  async dlProductSoldReport(@Body() data: any, @Query() query: Request['query'], @Res() res: Response) {
    let result = await this.fileService.dlProductSoldReport(data, query);
    res.download(`${result}`);
  }

  @Post('report/dlTransactionHistoryReport')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Header(`Content-Type`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64')
  async dlTransactionHistoryReport(@Body() data: any, @Query() query: Request['query'], @Res() res: Response) {
    let result = await this.fileService.dlTransactionHistoryReport(data, query);
    res.download(`${result}`);
  }
}
