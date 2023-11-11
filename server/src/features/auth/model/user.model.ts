import mongoose, { Schema, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/constants/role.enum';

export interface User {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: Role;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  isLogin: boolean;
  // store: Store[];
  lastLogin: string;
  isActive: boolean;
  refreshToken: string;
}

export const UserSchema = new Schema<User>(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String },
    password: { type: String, required: true },
    role: { type: String, enum: Role },
    firstName: { type: String },
    lastName: { type: String },
    mobileNumber: { type: String },
    isLogin: { type: Boolean },
    lastLogin: { type: String },
    isActive: { type: Boolean, default: true },
    refreshToken: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
      virtuals: true,
    },
    toObject: { virtuals: true },
  },
);

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(this.password, salt);

  if (!this.isModified('password')) return next();
  
  this.password = hashedPassword
  next()
})
