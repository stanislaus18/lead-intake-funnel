import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ContactInformationDao, ContactInformationSchema } from './dao';
import { ContactInformationRepository } from './contact-information.repository';
import { ContactInformationService } from './contact-information.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ContactInformationDao.name, schema: ContactInformationSchema },
    ]),
  ],
  providers: [ContactInformationRepository, ContactInformationService],
  exports: [ContactInformationRepository, ContactInformationService],
})
export class ContactInformationModule {}
