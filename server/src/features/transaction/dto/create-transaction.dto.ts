import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { Product } from 'src/features/products/model/product.model';

export class CreateTransactionDto {
  @IsOptional()
  @IsArray()
  cartData: Product[];

  @IsOptional()
  @IsNumber()
  totalPrice: number;

  @IsOptional()
  @IsNumber()
  paymentReceived: number;

  @IsOptional()
  @IsNumber()
  paymentChange: number;

  @IsOptional()
  @IsString()
  customerName: string;
}
