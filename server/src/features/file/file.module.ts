import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from '../products/model/product.model';
import { ProductSoldSchema } from '../transaction/entities/product-sold.model';
import { TransactionService } from '../transaction/transaction.service';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'ProductSold', schema: ProductSoldSchema },
    ]),
    TransactionModule
  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
