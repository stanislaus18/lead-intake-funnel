import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { Building } from '../model';

export class BuildingDto {
  @ApiProperty({ description: 'Building id' })
  @IsOptional()
  @IsString()
  readonly id?: string;

  @ApiProperty({ description: 'Building version' })
  @IsString()
  @IsOptional()
  readonly version?: string;

  @ApiProperty({ description: 'Lead id' })
  @IsString()
  @IsOptional()
  readonly leadId?: string;

  @ApiProperty({ description: 'Building type' })
  @IsString()
  @IsOptional()
  readonly type?: string;

  @ApiProperty({ description: 'Address id' })
  @IsString()
  @IsOptional()
  readonly addressId?: string;

  @ApiProperty({ description: 'Building information id' })
  @IsString()
  @IsOptional()
  readonly buildingInformationId?: string;

  @ApiProperty({ description: 'Ownership relationships id' })
  @IsString()
  @IsOptional()
  readonly ownershipRelationshipsId?: string;

  @ApiProperty({ description: 'Energy relevant information id' })
  @IsString()
  @IsOptional()
  readonly energyRelevantInformationId?: string;

  @ApiProperty({ description: 'Hot water id' })
  @IsString()
  @IsOptional()
  readonly hotWaterId?: string;

  @ApiProperty({ description: 'Date when record was created' })
  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @ApiProperty({ description: 'Date when record was last updated' })
  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;

  static from(building: BuildingDto): Building | undefined {
    if (!building) {
      return undefined;
    }

    return plainToInstance(Building, building, {
      enableImplicitConversion: true,
    });
  }

  static toDto(building: Building): BuildingDto {
    return plainToInstance(BuildingDto, building, {
      enableImplicitConversion: true,
    });
  }
}
