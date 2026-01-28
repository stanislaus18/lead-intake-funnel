import { plainToInstance } from 'class-transformer';
import { AddressDao } from '../dao';

export class Address {
  readonly id?: string;
  readonly street?: string;
  readonly houseNumber?: string;
  readonly city?: string;
  readonly postalcode?: string;
  readonly countryCode?: string;
  readonly addressAddition?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  static create(address: Address): AddressDao {
    return plainToInstance(AddressDao, address, {
      enableImplicitConversion: true,
    });
  }

  static from(address: AddressDao): Address {
    return {
      id: address.id,
      street: address.street,
      houseNumber: address.houseNumber,
      city: address.city,
      postalcode: address.postalcode,
      countryCode: address.countryCode,
      addressAddition: address.addressAddition,
      createdAt: address.createdAt,
      updatedAt: address.updatedAt,
    };
  }
}
