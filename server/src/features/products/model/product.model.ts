import mongoose, { ObjectId, Schema, Types } from 'mongoose';

export interface Product {
  _id: Types.ObjectId;
  category: ObjectId;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  isAvailable: boolean;
  isActive: boolean;
}

export const ProductSchema = new Schema<Product>(
  {
    category: { type: Types.ObjectId, ref: 'Category' },
    name: { type: String, unique: true, required: true },
    description: { type: String },
    price: { type: Number },
    image: { type: String },
    quantity: { type: Number, default: 0 },
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
