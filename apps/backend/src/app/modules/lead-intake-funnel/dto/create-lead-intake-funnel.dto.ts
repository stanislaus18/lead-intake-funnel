import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, ValidateNested } from 'class-validator';
import { plainToInstance, Type } from 'class-transformer';

import { LeadIntakeFunnel } from '../model';
import { LeadIntakeFunnelDto } from './lead-intake-funnel.dto';
import { CreateBuildingDto } from '../../building/dto';
import { CreateContactDto } from '../../contact/dto/create-contact.dto';
import { CreateHeatingSystemDto } from '../../heating-system/dto';
import { CreateProjectDto } from '../../project/dto';

export class CreateLeadIntakeFunnelDto {
  @ApiProperty({ description: 'Version of the API' })
  @IsString()
  readonly version: string;

  @ApiProperty({ description: 'Contact details to be updated' })
  @ValidateNested()
  @Type(() => CreateContactDto)
  readonly contact: CreateContactDto;

  @ApiProperty({ description: 'Building details to be updated' })
  @ValidateNested()
  @Type(() => CreateBuildingDto)
  @IsOptional()
  readonly building?: CreateBuildingDto;

  @ApiProperty({ description: 'Heating system details to be updated' })
  @ValidateNested()
  @Type(() => CreateHeatingSystemDto)
  @IsOptional()
  readonly heatingSystem?: CreateHeatingSystemDto;

  @ApiProperty({ description: 'Project details to be updated' })
  @ValidateNested()
  @Type(() => CreateProjectDto)
  @IsOptional()
  readonly project?: CreateProjectDto;

  @ApiProperty({ description: 'Lead response id reference' })
  @IsString()
  @IsOptional()
  readonly leadResponseId?: string;

  @ApiProperty({ description: 'Date when record was created' })
  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @ApiProperty({ description: 'Date when record was last updated' })
  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;

  static from(
    createLeadIntakeFunnelDto: CreateLeadIntakeFunnelDto,
  ): LeadIntakeFunnel | undefined {
    return plainToInstance(LeadIntakeFunnel, createLeadIntakeFunnelDto, {
      enableImplicitConversion: true,
    });
  }

  static toDto(lead: LeadIntakeFunnel): LeadIntakeFunnelDto {
    return plainToInstance(LeadIntakeFunnelDto, lead, {
      enableImplicitConversion: true,
    });
  }
}
