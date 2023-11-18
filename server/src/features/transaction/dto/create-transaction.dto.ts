import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional } from "class-validator";
import { Product } from "src/features/products/model/product.model";

export class CreateTransactionDto {
    @IsNotEmpty()
    @IsArray()
    cartData: Product[];
  
    @IsOptional()
    @IsNumber()
    totalPrice: number;
}
