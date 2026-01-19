import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { IsOptional, IsString, IsDate } from 'class-validator';

export class LeadIntakeFunnelDto {
  @ApiProperty({ description: 'Version of the lead intake funnel' })
  @IsOptional()
  @IsString()
  readonly version: string;

  @ApiProperty({ description: 'Lead intake funnel ID' })
  @IsOptional()
  @IsString()
  readonly id: string;

  @ApiProperty({ description: 'Associated contact ID' })
  @IsOptional()
  @IsString()
  readonly contactId: string;

  @ApiProperty({ description: 'Associated building ID' })
  @IsOptional()
  @IsString()
  readonly buildingId: string;

  @ApiProperty({ description: 'Associated heating system ID' })
  @IsOptional()
  @IsString()
  readonly heatingSystemId: string;

  @ApiProperty({ description: 'Associated project ID' })
  @IsOptional()
  @IsString()
  readonly projectId: string;

  @ApiProperty({ description: 'Date when record was created' })
  @IsOptional()
  @IsDate()
  readonly createdAt: Date;

  @ApiProperty({ description: 'Date when record was last updated' })
  @IsOptional()
  @IsDate()
  readonly updatedAt: Date;

  static from(data: LeadIntakeFunnelDto): LeadIntakeFunnelDto {
    return this.create({
      ...(data?.version && { version: data.version }),
      ...(data?.id && { id: data.id }),
      ...(data?.contactId && { contactId: data.contactId }),
      ...(data?.buildingId && { buildingId: data.buildingId }),
      ...(data?.heatingSystemId && { heatingSystemId: data.heatingSystemId }),
      ...(data?.projectId && { projectId: data.projectId }),
      ...(data?.createdAt && { createdAt: data.createdAt }),
      ...(data?.updatedAt && { updatedAt: data.updatedAt }),
    });
  }

  static create(dto: LeadIntakeFunnelDto): LeadIntakeFunnelDto {
    return plainToInstance(LeadIntakeFunnelDto, dto);
  }
}
