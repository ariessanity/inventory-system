import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model, ObjectId, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './model/product.model';
import { User } from '../auth/model/user.model';
import { Store } from '../stores/model/store.model';

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
    const { name } = createProductDto;

    const isProductNameExist = await this.productModel.exists({ name });
    if (isProductNameExist) throw new ConflictException('Product already exists');

    const createProduct = await this.productModel.create({
      ...createProductDto,
    });

    return createProduct;
  }

  async getAllProduct(id: Types.ObjectId, category: string, search: string): Promise<Product[]> {
    const categoryQuery = category ? { category: category } : {};
    const searchQuery = search ? { name: { $regex: search, $options: 'i' } } : {};

    const store = await this.storeModel
      .findOne({ teamMembers: { $in: [{ _id: id }] } })
      .select('_id')
      .lean();

    const products = await this.productModel
      .find({ store: store?._id, ...categoryQuery, ...searchQuery })
      .populate({ path: 'category', select: 'name' })
      .lean();

    return products;
  }

  async updateProduct(id: ObjectId, updateProductDto: UpdateProductDto): Promise<Product> {
    const { name } = updateProductDto;

    const isProductNameExist = await this.productModel.exists({ name });
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
