import mongoose, { ObjectId, Schema, Types } from 'mongoose';
import { Product } from 'src/features/products/model/product.model';

export interface Transaction {
  _id: Types.ObjectId;
  transactionSku: string,
  cartData: Product[];
  totalPrice: number;
  paymentReceived: number;
  paymentChange: number;
  customerName: string;
  cashierName: string;
}

export const TransactionSchema = new Schema<Transaction>(
  {
    transactionSku: { type: String },
    cartData: { type: [] },
    totalPrice: { type: Number },
    paymentReceived: { type: Number },
    paymentChange: { type: Number },
    customerName: { type: String },
    cashierName: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
      virtuals: true,
    },
    toObject: { virtuals: true },
  },
);
