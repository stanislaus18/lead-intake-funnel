import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ContactInformationDto } from '../../contact-information/dto';
import { AddressDto } from '../../address/dto';
import { MarketingDto } from '../../marketing/dto';

export class CreateContactDto {
  @ApiProperty({ description: 'Contact information' })
  @ValidateNested()
  @Type(() => ContactInformationDto)
  readonly contactInformation: ContactInformationDto;

  @ApiProperty({ description: 'Address of contact person' })
  @ValidateNested()
  @Type(() => AddressDto)
  @IsOptional()
  readonly address?: AddressDto;

  @ApiProperty({ description: 'Marketing' })
  @ValidateNested()
  @Type(() => MarketingDto)
  @IsOptional()
  readonly marketing?: MarketingDto;

  @ApiProperty({ description: 'Date when record was created' })
  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @ApiProperty({ description: 'Date when record was last updated' })
  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;
}
