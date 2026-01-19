import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class AddressDto {
  @ApiProperty({ description: 'Street of an address' })
  @IsOptional()
  @IsString()
  readonly street: string;

  @ApiProperty({ description: 'City of an address' })
  @IsOptional()
  @IsString()
  readonly city: string;

  @ApiProperty({ description: 'Postal code of an address' })
  @IsOptional()
  @IsString()
  readonly postalCode: string;

  @ApiProperty({ description: 'Country code of an address' })
  @IsOptional()
  @IsString()
  readonly countryCode: string;

  @ApiProperty({ description: 'Additional part of an address' })
  @IsOptional()
  @IsString()
  readonly addressAddition: string;

  static from(address: AddressDto): AddressDto {
    return this.create({
      ...(address?.street && { street: address.street }),
      ...(address?.city && { city: address.city }),
      ...(address?.postalCode && { postalCode: address.postalCode }),
      ...(address?.countryCode && { countryCode: address.countryCode }),
      ...(address?.addressAddition && { addressAddition: address.addressAddition }),
    });
  }

  static create(dto: AddressDto): AddressDto {
    return plainToInstance(AddressDto, dto);
  }
}
