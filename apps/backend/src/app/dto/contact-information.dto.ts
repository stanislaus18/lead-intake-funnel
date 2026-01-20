import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import {
  IsString,
  IsEnum,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { SalutationEnum } from '../types/enums';

export class ContactInformationDto {
  @ApiProperty({ description: 'Salutation' })
  @IsEnum(SalutationEnum)
  @IsOptional()
  readonly salutation: SalutationEnum;

  @ApiProperty({ description: 'First name' })
  @IsString()
  readonly firstName: string;

  @ApiProperty({ description: 'Last name' })
  @IsString()
  readonly lastName: string;

  @ApiProperty({ description: 'Phone number' })
  @IsString()
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

  static from(data: ContactInformationDto): ContactInformationDto {
    return this.create({
      ...(data?.salutation && { salutation: data.salutation }),
      ...(data?.firstName && { firstName: data.firstName }),
      ...(data?.lastName && { lastName: data.lastName }),
      ...(data?.phone && { phone: data.phone }),
      ...(data?.email && { email: data.email }),
      ...(data?.newsletterSingleOptIn !== undefined && {
        newsletterSingleOptIn: data.newsletterSingleOptIn,
      }),
    });
  }

  static create(dto: ContactInformationDto): ContactInformationDto {
    return plainToInstance(ContactInformationDto, dto);
  }
}
