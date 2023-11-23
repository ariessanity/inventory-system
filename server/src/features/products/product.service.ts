import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model, ObjectId, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './model/product.model';
import { User } from '../auth/model/user.model';
import { Store } from '../stores/model/store.model';
import { Request } from 'express';
import { skip } from 'rxjs';
import { count } from 'console';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
    @InjectModel('Store')
    private readonly storeModel: Model<Store>,
  ) {}

  async createProduct(id: Types.ObjectId, createProductDto: CreateProductDto): Promise<Product> {
    const { name, price, quantity } = createProductDto;

    const isProductNameExist = await this.productModel.exists({ name });
    if (isProductNameExist) throw new ConflictException('Product already exists');

    const sku = await this.generateSku();
    const createProduct = await this.productModel.create({
      ...createProductDto,
      total: price * quantity,
      sku,
    });

    return createProduct;
  }

  async generateSku() {
    const highestSkuNo = await this.productModel.findOne().sort({ sku: -1 });

    let newSkuNo = '000001';

    if (highestSkuNo && highestSkuNo?.sku !== undefined) {
      const last6digit = highestSkuNo?.sku.match(/\d{6}$/);

      if (last6digit) {
        const nextNumber = parseInt(last6digit[0]) + 1;
        newSkuNo = nextNumber.toString().padStart(6, '0');
      }
    }

    return `SKU${newSkuNo}`;
  }

  async getAllProduct(id: Types.ObjectId, query: Request['query']): Promise<{ products: Product[]; count: number }> {
    if (query.category === 'All') query.category = null;

    const { page, limit, search, sortBy, sortOrder, category } = query;

    const LIMIT = limit ? +limit : 20;
    const SKIP = page ? (+page - 1) * +LIMIT : 0;

    const categoryQuery = category ? { category } : {};
    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { category: { $regex: search, $options: 'i' } },
            { sku: { $regex: search, $options: 'i' } },
            { unit: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const sortQuery = {};
    if (sortBy) sortQuery[sortBy as string] = sortOrder == 'asc' ? 1 : -1;

    const count = await this.productModel.countDocuments({ ...searchQuery, ...categoryQuery });
    const products = await this.productModel
      .find({ ...searchQuery, ...categoryQuery })
      .skip(SKIP)
      .limit(LIMIT)
      .sort(sortQuery)
      .lean();

    return { products, count };
  }

  async updateProduct(id: ObjectId, updateProductDto: UpdateProductDto): Promise<Product> {
    const { name, price, quantity } = updateProductDto;

    const isProductNameExist = await this.productModel.exists({ _id: { $ne: id }, name });
    if (isProductNameExist) throw new ConflictException('Product already exists');

    const updateProduct = await this.productModel.findByIdAndUpdate(id, { ...updateProductDto, total: price * quantity }, { new: true });
    return updateProduct;
  }

  async deleteProduct(id: ObjectId): Promise<Product> {
    const isProductExist = await this.productModel.exists({ _id: id });
    if (!isProductExist) throw new ConflictException('Product id not found');

    const deleteProduct = await this.productModel.findByIdAndDelete(id, { new: true });
    return deleteProduct;
  }
}
