import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from '../products/model/product.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
