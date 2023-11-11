import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { Store } from '../stores/model/store.model';
import { Category } from './model/category.model';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Store')
    private readonly storeModel: Model<Store>,
    @InjectModel('Category')
    private readonly categoryModel: Model<Category>,
  ) {}

  async createCategory(id: Types.ObjectId, createCategoryDto: CreateCategoryDto): Promise<Category> {
    const isCategoryExist = await this.categoryModel.exists({ name: createCategoryDto.name });
    if (isCategoryExist) throw new ConflictException('Category name already exists');

    const createCategory = await this.categoryModel.create({
      ...createCategoryDto,
    });

    return createCategory;
  }

  async getAllCategory(id: Types.ObjectId): Promise<Category[]> {
    const categories = await this.categoryModel.find().lean();

    return categories;
  }

  async updateCategory(id: ObjectId, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const { name } = updateCategoryDto;

    const isCategoryExist = await this.categoryModel.exists({ name });
    if (isCategoryExist) throw new ConflictException('Category name already exists');

    const updateCategory = await this.categoryModel.findByIdAndUpdate(id, { ...updateCategoryDto }, { new: true });
    return updateCategory;
  }

  async deleteCategory(id: ObjectId): Promise<Category> {
    const isCategoryExist = await this.categoryModel.exists({ _id: id });
    if (!isCategoryExist) throw new ConflictException('Category id not found');

    const deleteCategory = await this.categoryModel.findByIdAndDelete(id, { new: true });
    return deleteCategory;
  }
}
