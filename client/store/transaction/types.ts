import { Product } from "../product/types";

export type Transaction = {
  _id: string;
  cartData: Product[];
  totalPrice: number;
  paymentReceived: number;
  paymentChange: number;
  customerName: string
};

export type ProductSold = Partial<Product> & { customerName: string }
 