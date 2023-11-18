import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../products/model/product.model';
import { Store } from '../stores/model/store.model';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
  ) {}

  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    const { cartData } = createTransactionDto;

    await Promise.all(
      cartData?.map(async (cartItem: Product) => {
        const { _id: id, quantity } = cartItem;
        const product = await this.productModel.findById(id);

        const updateProductQty = await this.productModel.findByIdAndUpdate(id, { quantity: product?.quantity - quantity }, { new: true });
        return updateProductQty;
      }),
    );
  }
}
