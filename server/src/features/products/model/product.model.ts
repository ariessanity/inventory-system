import mongoose, { ObjectId, Schema, Types } from 'mongoose';

export interface Product {
  _id: Types.ObjectId;
  sku: string
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  total: number;
  isAvailable: boolean;
  isActive: boolean;
}

export const ProductSchema = new Schema<Product>(
  {
    sku: { type: String },
    name: { type: String, unique: true, required: true },
    description: { type: String },
    category: { type: String },
    price: { type: Number },
    unit: { type: String },
    quantity: { type: Number, default: 0 },
    total: { type: Number },
    isAvailable: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
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
