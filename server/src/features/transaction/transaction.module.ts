import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from '../products/model/product.model';
import { TransactionSchema } from './entities/transaction.model';
import { ProductSoldSchema } from './entities/product-sold.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Transaction', schema: TransactionSchema },
      { name: 'ProductSold', schema: ProductSoldSchema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService]
})
export class TransactionModule {}
