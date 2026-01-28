import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, map, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { AddressDao } from './dao';
import { AddressRepository } from './address.repository';

@Injectable()
export class AddressService {
  private readonly logger = new Logger(AddressService.name);

  constructor(private readonly addressRepository: AddressRepository) {}

  create(addressDao: AddressDao): Observable<string> {
    this.logger.log(`Creating address with ID: ${addressDao.id}`);

    try {
      return from(
        this.addressRepository.create({
          ...addressDao,
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      ).pipe(map((result) => result.id));
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
      return this.addressRepository.findById(id);
    } catch (error) {
      this.logger.error(`Failed to find address with ID: ${id}`, error);
      return of(null);
    }
  }

  update(id: string, addressDao: Partial<AddressDao>): Observable<AddressDao> {
    this.logger.log(`Updating address with ID: ${id}`);

    try {
      return this.addressRepository.update(id, {
        ...addressDao,
        updatedAt: new Date(),
      });
    } catch (error) {
      this.logger.error(`Failed to update address with ID: ${id}`, error);
      return of(null);
    }
  }

  delete(id: string): Observable<any> {
    this.logger.log(`Deleting address with ID: ${id}`);

    try {
      return this.addressRepository.delete(id);
    } catch (error) {
      this.logger.error(`Failed to delete address with ID: ${id}`, error);
      return of(null);
    }
  }
}
