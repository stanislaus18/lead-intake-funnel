import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { IsOptional, IsString, IsEnum, IsEmail, IsBoolean } from 'class-validator';
import { SalutationEnum } from '../types/enums';

export class ContactInformationDto {
  @ApiProperty({ description: 'Salutation' })
  @IsOptional()
  @IsEnum(SalutationEnum)
  readonly salutation: SalutationEnum;

  @ApiProperty({ description: 'First name' })
  @IsOptional()
  @IsString()
  readonly firstName: string;

  @ApiProperty({ description: 'Last name' })
  @IsOptional()
  @IsString()
  readonly lastName: string;

  @ApiProperty({ description: 'Phone number' })
  @IsOptional()
  @IsString()
  readonly phone: string;

  @ApiProperty({ description: 'Email address' })
  @IsOptional()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Newsletter single opt-in' })
  @IsOptional()
  @IsBoolean()
  readonly newsletterSingleOptIn: boolean;

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
