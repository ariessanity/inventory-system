import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/constants/role.enum';
import { RequestWithUser } from 'src/types/request-with-user';
import { ObjectId } from 'mongoose';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('api/createCategory')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  createCategory(@Request() req: RequestWithUser, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(req.user._id, createCategoryDto);
  }

  @Get('api/getAllCategory')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  getAllCategory(@Request() req: RequestWithUser) {
    return this.categoryService.getAllCategory(req.user._id);
  }

  @Put('api/updateCategory/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  updateCategory(@Param('id') id: ObjectId, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete('api/deleteCategory/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  deleteCategory(@Param('id') id: ObjectId) {
    return this.categoryService.deleteCategory(id);
  }
}
