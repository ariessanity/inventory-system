import mongoose, { ObjectId, Schema, Types } from 'mongoose';

export interface Store {
  _id: Types.ObjectId;
  name: string;
  teamMembers: ObjectId[],
  address: string;
  isActive: boolean;
}

export const StoreSchema = new Schema<Store>(
  {
    name: { type: String, unique: true, required: true },
    teamMembers: [{ type: Types.ObjectId, ref: 'User' }],
    address: { type: String },
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
