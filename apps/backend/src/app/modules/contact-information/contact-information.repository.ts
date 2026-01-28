import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, of } from 'rxjs';

import { ContactInformationDao } from './dao';

@Injectable()
export class ContactInformationRepository {
  private readonly logger = new Logger(ContactInformationRepository.name);

  constructor(
    @InjectModel(ContactInformationDao.name)
    private readonly contactInformationModel: Model<ContactInformationDao>,
  ) {}

  create(
    contactInformationDao: ContactInformationDao,
  ): Observable<ContactInformationDao> {
    this.logger.log(
      `Creating contact information with ID: ${contactInformationDao.id}`,
    );

    try {
      return from(this.contactInformationModel.create(contactInformationDao));
    } catch (error) {
      this.logger.error(
        `Failed to create contact information with ID: ${contactInformationDao.id}`,
        error,
      );
      return of(null);
    }
  }
}
