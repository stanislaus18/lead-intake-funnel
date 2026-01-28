import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { Address } from '../model';

export class AddressDto {
  @ApiProperty({ description: 'Address id' })
  @IsOptional()
  @IsString()
  readonly id?: string;

  @ApiProperty({ description: 'Street of an address' })
  @IsString()
  @IsOptional()
  readonly street?: string;

  @ApiProperty({ description: 'House number' })
  @IsString()
  @IsOptional()
  readonly houseNumber?: string;

  @ApiProperty({ description: 'City of an address' })
  @IsString()
  @IsOptional()
  readonly city?: string;

  @ApiProperty({ description: 'Postal code of an address' })
  @IsString()
  @IsOptional()
  readonly postalcode?: string;

  @ApiProperty({ description: 'ISO Country Code (e.g. "DE" for Germany)' })
  @IsString()
  @IsOptional()
  readonly countryCode?: string;

  @ApiProperty({
    description: 'Additional address information (e.g. "1. Etage")',
  })
  @IsString()
  @IsOptional()
  readonly addressAddition?: string;

  @ApiProperty({ description: 'Date when record was created' })
  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @ApiProperty({ description: 'Date when record was last updated' })
  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;

  static from(address: AddressDto): Address | undefined {
    if (!address) {
      return undefined;
    }

    return plainToInstance(Address, address, {
      enableImplicitConversion: true,
    });
  }

  static toDto(address: Address): AddressDto {
    return plainToInstance(AddressDto, address, {
      enableImplicitConversion: true,
    });
  }
}
