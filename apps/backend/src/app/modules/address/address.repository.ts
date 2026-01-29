import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, of } from 'rxjs';

import { AddressDao } from './dao';

@Injectable()
export class AddressRepository {
  private readonly logger = new Logger(AddressRepository.name);

  constructor(
    @InjectModel(AddressDao.name)
    private readonly addressModel: Model<AddressDao>,
  ) {}

  create(addressDao: AddressDao): Observable<AddressDao> {
    this.logger.log(`Creating address with ID: ${addressDao.id}`);

    try {
      return from(
        this.addressModel.create({
          ...addressDao,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      );
    } catch (error) {
      this.logger.error(
        `Failed to create address with ID: ${addressDao.id}`,
        error,
      );
      return of(null);
    }
  }

  findById(id: string): Observable<AddressDao> {
    this.logger.log(`Finding address with ID: ${id}`);

    try {
      return from(
        this.addressModel.findOne(
          { id },
          { _id: 0, createdAt: 0, updatedAt: 0, id: 0 },
        ),
      );
    } catch (error) {
      this.logger.error(`Failed to find address with ID: ${id}`, error);
      return of(null);
    }
  }

  update(id: string, addressDao: Partial<AddressDao>): Observable<AddressDao> {
    this.logger.log(`Updating address with ID: ${id}`);

    try {
      return from(
        this.addressModel.findOneAndUpdate(
          { id },
          { ...addressDao, updatedAt: new Date() },
          { new: true },
        ),
      );
    } catch (error) {
      this.logger.error(`Failed to update address with ID: ${id}`, error);
      return of(null);
    }
  }

  delete(id: string): Observable<any> {
    this.logger.log(`Deleting address with ID: ${id}`);

    try {
      return from(this.addressModel.deleteOne({ id }));
    } catch (error) {
      this.logger.error(`Failed to delete address with ID: ${id}`, error);
      return of(null);
    }
  }
}
