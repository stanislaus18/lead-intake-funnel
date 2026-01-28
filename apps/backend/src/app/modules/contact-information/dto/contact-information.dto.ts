import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsDate,
} from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { SalutationEnum } from '../enum';
import { ContactInformation } from '../model';

export class ContactInformationDto {
  @ApiProperty({ description: 'Contact information id' })
  @IsOptional()
  @IsString()
  readonly id?: string;

  @ApiProperty({ description: 'Salutation' })
  @IsEnum(SalutationEnum)
  @IsOptional()
  readonly salutation?: SalutationEnum;

  @ApiProperty({ description: 'First name' })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({ description: 'Last name' })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({ description: 'Phone number' })
  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty({ description: 'Email address' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is missing' })
  readonly email: string;

  @ApiProperty({
    description: 'Newsletter single opt-in',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  readonly newsletterSingleOptIn: boolean = false;

  @ApiProperty({ description: 'Date when record was created' })
  @IsOptional()
  @IsDate()
  readonly createdAt: Date;

  @ApiProperty({ description: 'Date when record was last updated' })
  @IsOptional()
  @IsDate()
  readonly updatedAt: Date;

  static create(contactInformation: ContactInformation): ContactInformationDto {
    return plainToInstance(ContactInformationDto, contactInformation, {
      enableImplicitConversion: true,
    });
  }

  static from(
    contactInformationDto: ContactInformationDto,
  ): ContactInformation {
    return {
      id: contactInformationDto.id,
      salutation: contactInformationDto.salutation,
      firstName: contactInformationDto.firstName,
      lastName: contactInformationDto.lastName,
      phone: contactInformationDto.phone,
      email: contactInformationDto.email,
      newsletterSingleOptIn: contactInformationDto.newsletterSingleOptIn,
      createdAt: contactInformationDto.createdAt,
      updatedAt: contactInformationDto.updatedAt,
    };
  }
}
