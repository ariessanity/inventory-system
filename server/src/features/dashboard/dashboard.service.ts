import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../products/model/product.model';
import { Model } from 'mongoose';
import { Transaction } from '../transaction/entities/transaction.model';
import { ProductSold } from '../transaction/entities/product-sold.model';
import { todayEnd, todayStart } from 'src/constants/date.enum';
import { DashboardStatistics } from './types';

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
    console.log({todayEnd})
    console.log({todayStart})

    const salesToday = await this.transactionModel.aggregate([
      {
        $match: {
          createdAt: { $gte: todayStart, $lte: todayEnd },
        },
      },
      { $group: { _id: null, salesToday: { $sum: '$totalPrice' } } },
    ]);

    return {
      totalProducts,
      inventoryValue: inventoryValue[0]?.inventoryValue,
      salesToday: salesToday[0]?.salesToday || 0,
      soldToday: soldToday[0]?.count || 0,
    };
  }
}
