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

  findById(id: string): Observable<ContactInformationDao> {
    this.logger.log(`Finding contact information with ID: ${id}`);
    try {
      return from(
        this.contactInformationModel.findOne(
          { id },
          { _id: 0, createdAt: 0, updatedAt: 0, id: 0 },
        ),
      );
    } catch (error) {
      this.logger.error(
        `Failed to find contact information with ID: ${id}`,
        error,
      );
      return of(null);
    }
  }
}
