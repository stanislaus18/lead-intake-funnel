import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ContactDao, ContactSchema } from './dao';
import { ContactRepository } from './contact.repository';
import { ContactService } from './contact.service';
import { MarketingModule } from '../marketing/marketing.module';
import { AddressModule } from '../address/address.module';
import { ContactInformationModule } from '../contact-information/contact-information.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ContactDao.name, schema: ContactSchema },
    ]),
    ContactInformationModule,
    AddressModule,
    MarketingModule,
  ],
  providers: [ContactRepository, ContactService],
  exports: [ContactRepository, ContactService],
})
export class ContactModule {}
