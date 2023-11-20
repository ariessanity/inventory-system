import mongoose, { Schema, Types } from 'mongoose';
import { Product } from 'src/features/products/model/product.model';

export interface ProductSold extends Partial<Product> {
  _id: Types.ObjectId;
  customerName: string;
  cashierName: string;
  transactionSku: string
}

export const ProductSoldSchema = new Schema<ProductSold>(
  {
    name: { type: String },
    sku: { type: String },
    description: { type: String },
    unit: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    total: { type: Number },
    customerName: { type: String },
    cashierName: { type: String },
    transactionSku: { type: String },
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
