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

  async generateSku(): Promise<string> {
    const count = await this.productModel.countDocuments();
    const paddedCount = String(count + 1).padStart(6, '0'); // Pad the count to 6 digits
    const sku = `SKU${paddedCount}`;
    return sku;
  }

  async getAllProduct(id: Types.ObjectId, query: Request['query']): Promise<{ products: Product[]; count: number }> {
    console.log({ query });
    const { page, limit, search } = query;

    const LIMIT = limit ? +limit : 20;
    const SKIP = page ? (+page - 1) * +LIMIT : 0;

    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { category: { $regex: search, $options: 'i' } },
            { sku: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const count = await this.productModel.countDocuments({...searchQuery});
    const products = await this.productModel
      .find({ ...searchQuery })
      .skip(SKIP)
      .limit(LIMIT)
      .lean();

    return { products, count };
  }

  async getCountProduct(): Promise<number> {
    const count = await this.productModel.countDocuments();
    return count;
  }

  async updateProduct(id: ObjectId, updateProductDto: UpdateProductDto): Promise<Product> {
    const { name } = updateProductDto;

    const isProductNameExist = await this.productModel.exists({ _id: { $ne: id }, name });
    if (isProductNameExist) throw new ConflictException('Product already exists');

    const updateProduct = await this.productModel.findByIdAndUpdate(id, { ...updateProductDto }, { new: true });
    return updateProduct;
  }

  async deleteProduct(id: ObjectId): Promise<Product> {
    const isProductExist = await this.productModel.exists({ _id: id });
    if (!isProductExist) throw new ConflictException('Product id not found');

    const deleteProduct = await this.productModel.findByIdAndDelete(id, { new: true });
    return deleteProduct;
  }
}
