import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressDao, AddressSchema } from './dao';
import { AddressRepository } from './address.repository';
import { AddressService } from './address.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AddressDao.name, schema: AddressSchema },
    ]),
  ],
  providers: [AddressRepository, AddressService],
  exports: [AddressRepository, AddressService],
})
export class AddressModule {}
