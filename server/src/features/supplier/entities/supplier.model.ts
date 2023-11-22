import { Schema, Types } from 'mongoose';

export interface Supplier {
  _id: Types.ObjectId;
  companyName: string;
  contactName: string;
  contactNumber: string;
  email: string;
  remarks: string;
  isActive: boolean;
}

export const SupplierSchema = new Schema<Supplier>(
  {
    companyName: { type: String },
    contactName: { type: String },
    contactNumber: { type: String },
    email: { type: String },
    remarks: { type: String },
    isActive: { type: Boolean },
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
