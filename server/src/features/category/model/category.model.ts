import mongoose, { ObjectId, Schema, Types } from 'mongoose';

export interface Category {
  name: string;
  description: string;
  isActive: boolean;
}

export const CategorySchema = new Schema<Category>(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String },
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
