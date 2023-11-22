import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Query, Req } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { RequestWithUser } from 'src/types/request-with-user';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/constants/role.enum';
import { ObjectId } from 'mongoose';
import { SupplierService } from './supplier.service';
import { Request } from 'express';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post('api/createSupplier')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  createSupplier(@Req() req: RequestWithUser, @Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.createSupplier(req.user._id, createSupplierDto);
  }

  @Get('api/getAllSuppliers')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  getAllSupplier(@Req() req: RequestWithUser, @Query() query: Request['query']) {
    return this.supplierService.getAllSupplier(req.user._id, query);
  }

  @Put('api/updateSupplier/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  updateSupplier(@Param('id') id: ObjectId, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.supplierService.updateSupplier(id, updateSupplierDto);
  }

  @Delete('api/deleteSupplier/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  deleteSupplier(@Param('id') id: ObjectId) {
    return this.supplierService.deleteSupplier(id);
  }
}
