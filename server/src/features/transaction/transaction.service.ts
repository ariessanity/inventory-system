import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Product } from '../products/model/product.model';
import { Transaction } from './entities/transaction.model';
import { User } from '../auth/model/user.model';
import { ProductSold } from './entities/product-sold.model';
import { Request } from 'express';
import { addHours, format } from 'date-fns';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
    @InjectModel('Transaction')
    private readonly transactionModel: Model<Transaction>,
    @InjectModel('ProductSold')
    private readonly productSoldModel: Model<ProductSold>,
  ) {}

  async createTransaction(user: User, createTransactionDto: CreateTransactionDto): Promise<void> {
    const { cartData, customerName } = createTransactionDto;
    const transactionSku = await this.generateSku();

    //Update Quantity
    await Promise.all(
      cartData?.map(async (cartItem: Product) => {
        const { _id: id, quantity, price, ...rest } = cartItem;

        const isProductExist = await this.productModel.exists({ _id: id });
        if (!isProductExist) throw new ConflictException('Product not found!');

        const product = await this.productModel.findOne({ _id: id }).lean();

        //Create Product Sold
        await this.productSoldModel.create({
          ...rest,
          quantity,
          price,
          customerName,
          cashierName: `${user?.firstname} ${user?.lastname}`,
          total: quantity * price,
          transactionSku,
          createdAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }),
        });

        const updateProductQty = await this.productModel.findByIdAndUpdate(
          id,
          { quantity: product?.quantity - quantity, total: product.total - quantity * price },
          { new: true },
        );
        return updateProductQty;
      }),
    );

    //Create Transaction
    await this.transactionModel.create({
      ...createTransactionDto,
      transactionSku,
      cashierName: `${user?.firstname} ${user?.lastname}`,
      createdAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }),
    });
  }

  async generateSku() {
    const formattedDate = format(addHours(new Date(), 8), 'yyyyMMdd');

    const highestSkuNo = await this.transactionModel
      .findOne({
        transactionSku: {
          $regex: new RegExp(`^TRN${formattedDate}`),
        },
      })
      .sort({ transactionSku: -1 });

    let newSkuNo = '00001';

    if (highestSkuNo && highestSkuNo?.transactionSku !== undefined) {
      const last5digit = highestSkuNo?.transactionSku.match(/\d{5}$/);

      if (last5digit) {
        const nextNumber = parseInt(last5digit[0]) + 1;
        newSkuNo = nextNumber.toString().padStart(5, '0');
      }
    }

    return `TRN${formattedDate}${newSkuNo}`;
  }

  async getTransactionHistory(query: Request['query']): Promise<{ transactionHistory: Transaction[]; count: number }> {
    const { page, limit, search, sortBy, sortOrder, startDate, endDate } = query;

    const LIMIT = limit ? +limit : 10000000;
    const SKIP = page ? (+page - 1) * +LIMIT : 0;

    const searchQuery: FilterQuery<Product> = {};
    if (startDate && endDate) {
      const isoStartDate = new Date(startDate as string).toISOString();
      const isoEndDate = new Date((endDate + 'T23:59:59') as string).toISOString();

      searchQuery.createdAt = {
        $gte: isoStartDate,
        $lte: isoEndDate,
      };
    }

    const sortQuery = {};
    if (sortBy) sortQuery[sortBy as string] = sortOrder == 'asc' ? 1 : -1;

    const count = await this.transactionModel.countDocuments({ ...searchQuery });
    const transactionHistory = await this.transactionModel
      .find({ ...searchQuery })
      .skip(SKIP)
      .limit(LIMIT)
      .sort({ ...sortQuery, createdAt: -1 })
      .lean();

    return { transactionHistory, count };
  }

  async getProductSold(query: Request['query']): Promise<{ productSold: ProductSold[]; count: number }> {
    const { page, limit, search, sortBy, sortOrder, startDate, endDate } = query;

    const LIMIT = limit ? +limit : 10000000;
    const SKIP = page ? (+page - 1) * +LIMIT : 0;

    const searchQuery: FilterQuery<Product> = {};
    if (startDate && endDate) {
      const isoStartDate = new Date(startDate as string).toISOString();
      const isoEndDate = new Date((endDate + 'T23:59:59') as string).toISOString();

      searchQuery.createdAt = {
        $gte: isoStartDate,
        $lte: isoEndDate,
      };
    }

    const sortQuery = {};
    if (sortBy) sortQuery[sortBy as string] = sortOrder == 'asc' ? 1 : -1;

    const count = await this.productSoldModel.countDocuments({ ...searchQuery });
    const productSold = await this.productSoldModel
      .find({ ...searchQuery })
      .skip(SKIP)
      .limit(LIMIT)
      .sort({ ...sortQuery, createdAt: -1 })
      .lean();

    return { productSold, count };
  }
}
