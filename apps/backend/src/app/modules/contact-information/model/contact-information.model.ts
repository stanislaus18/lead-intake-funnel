import { plainToInstance } from 'class-transformer';

import { SalutationEnum } from './../enum';
import { ContactInformationDao } from '../dao';

export class ContactInformation {
  readonly id?: string;
  readonly salutation?: SalutationEnum;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly email: string;
  readonly newsletterSingleOptIn: boolean = false;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  static create(contactInformation: ContactInformation): ContactInformationDao {
    return plainToInstance(ContactInformationDao, contactInformation, {
      enableImplicitConversion: true,
    });
  }

  static from(
    contactInformationDao: ContactInformationDao,
  ): ContactInformation {
    return {
      id: contactInformationDao.id,
      salutation: contactInformationDao.salutation,
      firstName: contactInformationDao.firstName,
      lastName: contactInformationDao.lastName,
      phone: contactInformationDao.phone,
      email: contactInformationDao.email,
      newsletterSingleOptIn: contactInformationDao.newsletterSingleOptIn,
      createdAt: contactInformationDao.createdAt,
      updatedAt: contactInformationDao.updatedAt,
    };
  }
}
