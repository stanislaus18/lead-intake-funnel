import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, of } from 'rxjs';

import { ContactDao } from './dao';

@Injectable()
export class ContactRepository {
  private readonly logger = new Logger(ContactRepository.name);

  constructor(
    @InjectModel(ContactDao.name)
    private readonly contactModel: Model<ContactDao>,
  ) {}

  create(contactDao: ContactDao): Observable<ContactDao> {
    this.logger.log(`Creating contact with ID: ${contactDao.id}`);

    try {
      return from(
        this.contactModel.create({
          ...contactDao,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      );
    } catch (error) {
      this.logger.error(
        `Failed to create contact with ID: ${contactDao.id}`,
        error,
      );
      return of(null);
    }
  }

  findById(id: string): Observable<ContactDao> {
    this.logger.log(`Finding contact with ID: ${id}`);

    try {
      return from(this.contactModel.findOne({ id }));
    } catch (error) {
      this.logger.error(`Failed to find contact with ID: ${id}`, error);
      return of(null);
    }
  }

  update(id: string, contactDao: Partial<ContactDao>): Observable<ContactDao> {
    this.logger.log(`Updating contact with ID: ${id}`);

    try {
      return from(
        this.contactModel.findOneAndUpdate(
          { id },
          { ...contactDao, updatedAt: new Date() },
          { new: true },
        ),
      );
    } catch (error) {
      this.logger.error(`Failed to update contact with ID: ${id}`, error);
      return of(null);
    }
  }

  delete(id: string): Observable<any> {
    this.logger.log(`Deleting contact with ID: ${id}`);

    try {
      return from(this.contactModel.deleteOne({ id }));
    } catch (error) {
      this.logger.error(`Failed to delete contact with ID: ${id}`, error);
      return of(null);
    }
  }
}
