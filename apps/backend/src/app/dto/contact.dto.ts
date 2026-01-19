import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { plainToInstance } from 'class-transformer';
import { IsOptional, IsString, IsDate, ValidateNested } from 'class-validator';
import { ContactInformationDto } from './contact-information.dto';
import { AddressDto } from './address.dto';
import { MarketingDto } from './marketing.dto';

export class ContactDto {
  @ApiProperty({ description: 'Contact ID' })
  @IsOptional()
  @IsString()
  readonly id: string;

  @ApiProperty({ description: 'Contact type' })
  @IsOptional()
  @IsString()
  readonly type: string;

  @ApiProperty({
    type: ContactInformationDto,
    description: 'Contact information details',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ContactInformationDto)
  readonly contactInformation: ContactInformationDto;

  @ApiProperty({ type: AddressDto, description: 'Address information' })
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  readonly address: AddressDto;

  @ApiProperty({ type: MarketingDto, description: 'Marketing information' })
  @IsOptional()
  @ValidateNested()
  @Type(() => MarketingDto)
  readonly marketing: MarketingDto;

  @ApiProperty({ description: 'Date when record was created' })
  @IsOptional()
  @IsDate()
  readonly createdAt: Date;

  @ApiProperty({ description: 'Date when record was last updated' })
  @IsOptional()
  @IsDate()
  readonly updatedAt: Date;

  static from(data: ContactDto): ContactDto {
    return this.create({
      ...(data?.id && { id: data.id }),
      ...(data?.type && { type: data.type }),
      ...(data?.contactInformation && {
        contactInformation: ContactInformationDto.from(data.contactInformation),
      }),
      ...(data?.address && { address: AddressDto.from(data.address) }),
      ...(data?.marketing && { marketing: MarketingDto.from(data.marketing) }),
      ...(data?.createdAt && { createdAt: data.createdAt }),
      ...(data?.updatedAt && { updatedAt: data.updatedAt }),
    });
  }

  static create(dto: ContactDto): ContactDto {
    return plainToInstance(ContactDto, dto);
  }
}
