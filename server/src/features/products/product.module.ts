import { Module } from '@nestjs/common';
import { ProductSchema } from './model/product.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../auth/model/user.model';
import { StoreSchema } from '../stores/model/store.model';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Store', schema: StoreSchema },

    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
