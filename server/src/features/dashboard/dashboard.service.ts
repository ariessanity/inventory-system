import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../products/model/product.model';
import { Model } from 'mongoose';
import { Transaction } from '../transaction/entities/transaction.model';
import { ProductSold } from '../transaction/entities/product-sold.model';
import { currentMonth, todayEnd, todayStart } from 'src/constants/date.enum';
import { DashboardStatistics, DataLabels } from './types';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
    @InjectModel('Transaction')
    private readonly transactionModel: Model<Transaction>,
    @InjectModel('ProductSold')
    private readonly productSoldModel: Model<ProductSold>,
  ) {}

  async getStatistics(): Promise<DashboardStatistics> {
    const totalProducts = await this.productModel.countDocuments();
    const inventoryValue = await this.productModel.aggregate([{ $group: { _id: null, inventoryValue: { $sum: '$total' } } }]);
    const salesToday = await this.salesToday();
    const soldToday = await this.soldToday();
    const chartSales = await this.productSales();
    const chartProductSold = await this.productSold();
    
    return {
      totalProducts,
      inventoryValue: inventoryValue[0]?.inventoryValue,
      salesToday,
      soldToday,
      chartSales,
      chartProductSold,
    };
  }

  async soldToday() {
    const soldToday = await this.productSoldModel.aggregate([
      {
        $match: {
          createdAt: { $gte: todayStart, $lte: todayEnd },
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: '$quantity' },
        },
      },
    ]);

    return soldToday[0]?.count;
  }

  async salesToday() {
    const salesToday = await this.transactionModel.aggregate([
      {
        $match: {
          createdAt: { $gte: todayStart, $lte: todayEnd },
        },
      },
      { $group: { _id: null, salesToday: { $sum: '$totalPrice' } } },
    ]);

    return salesToday[0]?.salesToday || 0;
  }

  async productSales(): Promise<DataLabels> {
    const chartProductSales = await this.productSoldModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: '$createdAt' }, currentMonth],
          },
        },
      },
      {
        $project: {
          yearMonthDay: { $dateToString: { format: '%m-%d', date: '$createdAt' } },
          total: '$total',
        },
      },
      {
        $group: {
          _id: '$yearMonthDay',
          total: { $sum: '$total' },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $group: {
          _id: null,
          stats: { $push: '$$ROOT' },
        },
      },
    ]);

    const labelsProductSales = chartProductSales[0].stats.map((item) => item._id);
    const dataProductSales = chartProductSales[0].stats.map((item) => item.total);

    return {
      labels: labelsProductSales,
      data: dataProductSales,
    };
  }

  async productSold(): Promise<DataLabels> {
    const chartProductSold = await this.productSoldModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: '$createdAt' }, currentMonth],
          },
        },
      },
      {
        $project: {
          yearMonthDay: { $dateToString: { format: '%m-%d', date: '$createdAt' } },
          quantity: '$quantity',
        },
      },
      {
        $group: {
          _id: '$yearMonthDay',
          total: { $sum: '$quantity' },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $group: {
          _id: null,
          stats: { $push: '$$ROOT' },
        },
      },
    ]);

    const labelsProductSold = chartProductSold[0].stats.map((item) => item._id);
    const dataProductSold = chartProductSold[0].stats.map((item) => item.total);

    return {
      labels: labelsProductSold,
      data: dataProductSold,
    };
  }
}
