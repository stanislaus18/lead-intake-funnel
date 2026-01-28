import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { plainToInstance } from 'class-transformer';

import { LeadIntakeFunnel } from '../model';

export class LeadIntakeFunnelDto {
  @ApiProperty({ description: 'Lead id' })
  @IsOptional()
  @IsString()
  readonly id?: string;

  @ApiProperty({ description: 'Lead version' })
  @IsString()
  @IsOptional()
  readonly version?: string;

  @ApiProperty({ description: 'Contact id reference' })
  @IsString()
  @IsOptional()
  readonly contactId?: string;

  @ApiProperty({ description: 'Building id reference' })
  @IsString()
  @IsOptional()
  readonly buildingId?: string;

  @ApiProperty({ description: 'Heating system id reference' })
  @IsString()
  @IsOptional()
  readonly heatingSystemId?: string;

  @ApiProperty({ description: 'Project id reference' })
  @IsString()
  @IsOptional()
  readonly projectId?: string;

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

  static from(lead: LeadIntakeFunnelDto): LeadIntakeFunnel | undefined {
    return plainToInstance(LeadIntakeFunnel, lead, {
      enableImplicitConversion: true,
    });
  }

  static toDto(lead: LeadIntakeFunnel): LeadIntakeFunnelDto {
    return plainToInstance(LeadIntakeFunnelDto, lead, {
      enableImplicitConversion: true,
    });
  }
}
