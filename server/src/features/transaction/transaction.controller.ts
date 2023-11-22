import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/constants/role.enum';
import { RequestWithUser } from 'src/types/request-with-user';
import { Request } from 'express';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('api/createTransaction')
  @UseGuards(JwtAuthGuard)
  createTransaction(@Req() req: RequestWithUser, @Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.createTransaction(req.user, createTransactionDto);
  }

  @Get('api/getTransactionHistory')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  getTransactionHistory(@Query() query: Request['query']) {
    return this.transactionService.getTransactionHistory(query);
  }

  @Get('api/getProductSold')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  getProductSold(@Query() query: Request['query']) {
    return this.transactionService.getProductSold(query);
  }
}
