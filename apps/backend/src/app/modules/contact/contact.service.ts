import { HttpException, Injectable, Logger } from '@nestjs/common';
import {
  Observable,
  catchError,
  combineLatest,
  forkJoin,
  map,
  of,
  switchMap,
} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { ContactDao } from './dao';
import { ContactRepository } from './contact.repository';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactInformationService } from '../contact-information/contact-information.service';
import { ContactInformation } from '../contact-information/model';
import { Address } from '../address/model';
import { AddressService } from '../address/address.service';
import { Marketing } from '../marketing/model';
import { MarketingService } from '../marketing/marketing.service';
import { Contact } from './model';
import { error } from 'console';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    private readonly contactRepository: ContactRepository,
    private readonly contactInformationService: ContactInformationService,
    private readonly addressService: AddressService,
    private readonly marketingService: MarketingService,
  ) {}

  create(createContactDto: CreateContactDto): Observable<string> {
    this.logger.log(`Creating contact`);

    const contactCreationArray: Observable<string>[] = [];

    const contactInformation = ContactInformation.create(
      createContactDto.contactInformation,
    );
    const address = Address.create(createContactDto.address);
    const marketing = Marketing.create(createContactDto.marketing);

    if (!contactInformation) {
      this.logger.error(
        `Contact information is required to create a minimal Lead`,
      );
      return of(null);
    }

    contactCreationArray.push(
      this.contactInformationService.create(contactInformation),
    );
    contactCreationArray.push(
      address ? this.addressService.create(address) : of(undefined),
    );
    contactCreationArray.push(
      marketing ? this.marketingService.create(marketing) : of(undefined),
    );

    try {
      return forkJoin(contactCreationArray).pipe(
        map((ids) => {
          return Contact.create({
            id: uuidv4(),
            contactInformationId: ids[0],
            addressId: ids[1],
            marketingId: ids[2],
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }),
        switchMap((contactDao: ContactDao) =>
          this.contactRepository.create(contactDao),
        ),
        map((result) => result.id),
        catchError((error) => {
          this.logger.error(`Failed to create contact`, error);
          throw new HttpException('Failed to create contact', 400);
        }),
      );
    } catch (error) {
      this.logger.error(`Failed to create contact`, error);
      throw new HttpException('Failed to create contact', 400);
    }
  }

  findById(id: string): Observable<any> {
    this.logger.log(`Finding contact with ID: ${id}`);

    try {
      return this.contactRepository.findById(id).pipe(
        switchMap((contactDao: ContactDao) => {
          return combineLatest([
            this.contactInformationService.findById(
              contactDao.contactInformationId,
            ),
            this.addressService.findById(contactDao.addressId),
          ]);
        }),
        map(([contactInformation, address]) => {
          return {
            contactInformation,
            address,
          };
        }),
      );
    } catch (error) {
      this.logger.error(`Failed to find contact with ID: ${id}`, error);
      return of(null);
    }
  }

  update(id: string, contactDao: Partial<ContactDao>): Observable<ContactDao> {
    this.logger.log(`Updating contact with ID: ${id}`);

    try {
      return this.contactRepository.update(id, {
        ...contactDao,
        updatedAt: new Date(),
      });
    } catch (error) {
      this.logger.error(`Failed to update contact with ID: ${id}`, error);
      return of(null);
    }
  }

  delete(id: string): Observable<any> {
    this.logger.log(`Deleting contact with ID: ${id}`);

    try {
      return this.contactRepository.delete(id);
    } catch (error) {
      this.logger.error(`Failed to delete contact with ID: ${id}`, error);
      return of(null);
    }
  }
}
