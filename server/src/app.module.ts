import { Module, ValidationPipe } from '@nestjs/common';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ResponseInterceptor } from './interceptors/respose.interceptor';
import { NotFoundExceptionFilter } from './exceptions/not-found.filter';
import { ConflictExceptionFilter } from './exceptions/conflict.filter';
import { BadRequestExceptionFilter } from './exceptions/bad-request.filter';
import { RolesGuard } from './guards/role.guard';
import { JwtService } from '@nestjs/jwt';
import { StoresModule } from './features/stores/stores.module';
import { ProductModule } from './features/products/product.module';
import { CategoryModule } from './features/category/category.module';
import { TransactionModule } from './features/transaction/transaction.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://projectalpha:ZDwuey3ZZVXkUfWN@alpha.sw2wwhd.mongodb.net/inventory-system?retryWrites=true&w=majority'),
    UserModule,
    AuthModule,
    StoresModule,
    ProductModule,
    CategoryModule,
    TransactionModule
  ],
  controllers: [],
  providers: [
    JwtService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ConflictExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
