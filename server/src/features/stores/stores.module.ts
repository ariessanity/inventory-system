import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreSchema } from './model/store.model';
import { UserSchema } from '../auth/model/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Store', schema: StoreSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule {}
