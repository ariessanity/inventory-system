import { Product } from "../product/types";

export type Transaction = {
  _id: string;
  cartData: Product[];
  totalPrice: number;
  paymentReceived: number;
  paymentChange: number;
};

export type ProductSold = Partial<Product> & { customerName: string }
 