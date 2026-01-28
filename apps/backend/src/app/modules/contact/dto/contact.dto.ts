import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { Contact } from '../model';

export class ContactDto {
  @ApiProperty({ description: 'Contact id' })
  @IsOptional()
  @IsString()
  readonly id?: string;

  @ApiProperty({ description: 'Contact information id' })
  @IsString()
  @IsOptional()
  readonly contactInformationId?: string;

  @ApiProperty({ description: 'Address id' })
  @IsString()
  @IsOptional()
  readonly addressId?: string;

  @ApiProperty({ description: 'Marketing id' })
  @IsString()
  @IsOptional()
  readonly marketingId?: string;

  @ApiProperty({ description: 'Date when record was created' })
  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @ApiProperty({ description: 'Date when record was last updated' })
  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;

  static from(contact: ContactDto): Contact | undefined {
    if (!contact) {
      return undefined;
    }

    return plainToInstance(Contact, contact, {
      enableImplicitConversion: true,
    });
  }

  static toDto(contact: Contact): ContactDto {
    return plainToInstance(ContactDto, contact, {
      enableImplicitConversion: true,
    });
  }
}
