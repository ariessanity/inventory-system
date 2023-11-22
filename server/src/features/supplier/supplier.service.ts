import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.model';
import { Model, ObjectId, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';

@Injectable()
export class SupplierService {
  constructor(
    @InjectModel('Supplier')
    private readonly supplierModel: Model<Supplier>,
  ) {}

  async createSupplier(id: Types.ObjectId, createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const { companyName } = createSupplierDto;

    const isSupplierNameExist = await this.supplierModel.exists({ companyName });
    if (isSupplierNameExist) throw new ConflictException('Supplier already exists');

    const createSupplier = await this.supplierModel.create({
      ...createSupplierDto,
    });

    return createSupplier;
  }

  async getAllSupplier(id: Types.ObjectId, query: Request['query']): Promise<{ suppliers: Supplier[]; count: number }> {
    const { page, limit, search, sortBy, sortOrder } = query;

    const LIMIT = limit ? +limit : 20;
    const SKIP = page ? (+page - 1) * +LIMIT : 0;

    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { category: { $regex: search, $options: 'i' } },
            { sku: { $regex: search, $options: 'i' } },
            { unit: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const sortQuery = {};
    if (sortBy) sortQuery[sortBy as string] = sortOrder == 'asc' ? 1 : -1;

    const count = await this.supplierModel.countDocuments({ ...searchQuery });
    const suppliers = await this.supplierModel
      .find({ ...searchQuery })
      .skip(SKIP)
      .limit(LIMIT)
      .sort(sortQuery)
      .lean();

    return { suppliers, count };
  }

  async updateSupplier(id: ObjectId, updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
    const { companyName } = updateSupplierDto;

    const isSupplierNameExist = await this.supplierModel.exists({ _id: { $ne: id }, companyName });
    if (isSupplierNameExist) throw new ConflictException('Supplier already exists');

    const updateSupplier = await this.supplierModel.findByIdAndUpdate(id, { ...updateSupplierDto }, { new: true });
    return updateSupplier;
  }

  async deleteSupplier(id: ObjectId): Promise<Supplier> {
    const isSupplierExist = await this.supplierModel.exists({ _id: id });

    console.log(isSupplierExist)
    if (!isSupplierExist) throw new ConflictException('Supplier id not found');

    const deleteSupplier = await this.supplierModel.findByIdAndDelete(id, { new: true });
    return deleteSupplier;
  }
}
