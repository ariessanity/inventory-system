import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Workbook } from 'exceljs';
import * as tmp from 'tmp';
import { Product } from '../products/model/product.model';
import { FilterQuery, Model } from 'mongoose';
import { ProductSold } from '../transaction/entities/product-sold.model';
import { TransactionService } from '../transaction/transaction.service';
import { Request } from 'express';

@Injectable()
export class FileService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
    @InjectModel('ProductSold')
    private readonly productSoldModel: Model<ProductSold>,
    private readonly transactionService: TransactionService
  ) {}

  async downloadExcel(data: any) {
    let book = new Workbook();
    let worksheet = book.addWorksheet('Report');

    const headers = Object.keys(data[0]);
    worksheet.columns = headers.map((header) => ({ header, key: header }));

    for (let prod of data) {
      worksheet.addRow(prod);
    }

    let File = await new Promise((resolve, reject) => {
      tmp.file({ discardDescriptor: true, prefix: 'ReportSheet', postfix: '.xlsx', mode: parseInt('0600', 8) }, async (error, file) => {
        if (error) {
          throw new BadRequestException(error);
        }

        book.xlsx
          .writeFile(file)
          .then((_) => {
            resolve(file);
          })
          .catch((error) => {
            throw new BadRequestException(error);
          });
      });
    });

    return File;
  }

  async dlProductSoldReport(data: any, query: Request['query']) {
    query.page = ''
    query.limit = ''

    const productSold = await this.transactionService.getProductSold(query)

    let book = new Workbook();
    let worksheet = book.addWorksheet('Product Sold');

    worksheet.columns = [
      { header: 'SKU', key: 'sku', width: 15 },
      { header: 'TRN', key: 'transactionSku', width: 20},
      { header: 'Name', key: 'name', width: 35 },
      { header: 'Description', key: 'description', width: 35 },
      { header: 'Category', key: 'category', width: 20 },
      { header: 'Price', key: 'price', width: 10 },
      { header: 'Unit', key: 'unit', width: 10 },
      { header: 'Quantity', key: 'quantity', width: 10 },
      { header: 'Total', key: 'total', width: 10 },
      { header: 'Cashier Name', key: 'cashierName', width: 20 },
      { header: 'Customer Name', key: 'customerName', width: 20 },
      { header: 'Purchase Date', key: 'createdAt', width: 20 },
    ];

    for (let prod of productSold?.productSold) {
      worksheet.addRow(prod);
    }

    let File = await new Promise((resolve, reject) => {
      tmp.file({ discardDescriptor: true, prefix: 'Report', postfix: '.xlsx', mode: parseInt('0600', 8) }, async (error, file) => {
        if (error) {
          throw new BadRequestException(error);
        }

        book.xlsx
          .writeFile(file)
          .then((_) => {
            resolve(file);
          })
          .catch((error) => {
            throw new BadRequestException(error);
          });
      });
    });

    return File;
  }


  async dlTransactionHistoryReport(data: any, query: Request['query']) {
    query.page = ''
    query.limit = ''

    const transactionHistory = await this.transactionService.getTransactionHistory(query)

    let book = new Workbook();
    let worksheet = book.addWorksheet('Product Sold');

    worksheet.columns = [
      { header: 'TRN', key: 'transactionSku', width: 20},
      // { header: 'Cart Data', key: 'cartData', width: 35 },
      { header: 'Total Price', key: 'totalPrice', width: 35 },
      { header: 'Payment Recieved', key: 'paymentReceived', width: 20 },
      { header: 'Change', key: 'paymentChange', width: 10 },
      { header: 'Cashier Name', key: 'cashierName', width: 20 },
      { header: 'Customer Name', key: 'customerName', width: 20 },
      { header: 'Purchase Date', key: 'createdAt', width: 20 },
    ];

    for (let prod of transactionHistory?.transactionHistory) {
      worksheet.addRow(prod);
    }

    let File = await new Promise((resolve, reject) => {
      tmp.file({ discardDescriptor: true, prefix: 'Report', postfix: '.xlsx', mode: parseInt('0600', 8) }, async (error, file) => {
        if (error) {
          throw new BadRequestException(error);
        }

        book.xlsx
          .writeFile(file)
          .then((_) => {
            resolve(file);
          })
          .catch((error) => {
            throw new BadRequestException(error);
          });
      });
    });

    return File;
  }
}
