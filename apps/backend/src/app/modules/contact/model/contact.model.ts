import { plainToInstance } from 'class-transformer';
import { ContactDao } from '../dao';

export class Contact {
  readonly id: string;
  readonly contactInformationId: string;
  readonly addressId: string;
  readonly marketingId: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  static create(contact: Contact): ContactDao {
    return plainToInstance(ContactDao, contact, {
      enableImplicitConversion: true,
    });
  }

  static from(contact: ContactDao): Contact {
    return {
      id: contact.id,
      contactInformationId: contact.contactInformationId,
      addressId: contact.addressId,
      marketingId: contact.marketingId,
      createdAt: contact.createdAt,
      updatedAt: contact.updatedAt,
    };
  }
}
