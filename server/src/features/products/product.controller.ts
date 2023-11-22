import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Query, Req } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RequestWithUser } from 'src/types/request-with-user';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/constants/role.enum';
import { ObjectId } from 'mongoose';
import { ProductService } from './product.service';
import { Request } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('api/createProduct')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  createProduct(@Req() req: RequestWithUser, @Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(req.user._id, createProductDto);
  }

  @Get('api/getAllProducts')
  @UseGuards(JwtAuthGuard)
  getAllProduct(@Req() req: RequestWithUser, @Query() query: Request['query']) {
    return this.productService.getAllProduct(req.user._id, query);
  }

  @Put('api/updateProduct/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  updateProduct(@Param('id') id: ObjectId, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete('api/deleteProduct/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  deleteProduct(@Param('id') id: ObjectId) {
    return this.productService.deleteProduct(id);
  }
}
