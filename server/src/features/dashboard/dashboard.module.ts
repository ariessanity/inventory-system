import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TransactionModule } from '../transaction/transaction.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from '../products/model/product.model';
import { TransactionSchema } from '../transaction/entities/transaction.model';
import { ProductSoldSchema } from '../transaction/entities/product-sold.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Transaction', schema: TransactionSchema },
      { name: 'ProductSold', schema: ProductSoldSchema },
    ]),
    TransactionModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
