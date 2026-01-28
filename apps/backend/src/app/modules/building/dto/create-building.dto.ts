import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDate,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { plainToInstance, Type } from 'class-transformer';

import { Building } from '../model';
import { AddressDto } from '../../address/dto';
import { BuildingInformationDto } from '../../building-information/dto';
import { OwnershipRelationshipsDto } from '../../ownership-relationships/dto';
import { EnergyRelevantInformationDto } from '../../energy-relevant-information/dto';
import { HotWaterDto } from '../../hot-water/dto';

export class CreateBuildingDto {
  @ApiProperty({
    description:
      'Address of the Building where the Heat Pump is to be installed',
  })
  @ValidateNested()
  @Type(() => AddressDto)
  @IsOptional()
  readonly address?: AddressDto;

  @ApiProperty({ description: 'Building information' })
  @ValidateNested()
  @Type(() => BuildingInformationDto)
  @IsOptional()
  readonly buildingInformation?: BuildingInformationDto;

  @ApiProperty({ description: 'Ownership relationships' })
  @ValidateNested()
  @Type(() => OwnershipRelationshipsDto)
  @IsOptional()
  readonly ownershipRelationships?: OwnershipRelationshipsDto;

  @ApiProperty({ description: 'Energy relevant information' })
  @ValidateNested()
  @Type(() => EnergyRelevantInformationDto)
  @IsOptional()
  readonly energyRelevantInformation?: EnergyRelevantInformationDto;

  @ApiProperty({ description: 'Hot water' })
  @ValidateNested()
  @Type(() => HotWaterDto)
  @IsOptional()
  readonly hotWater?: HotWaterDto;

  @ApiProperty({ description: 'Date when record was created' })
  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @ApiProperty({ description: 'Date when record was last updated' })
  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;

  static from(building: CreateBuildingDto): Building | undefined {
    if (!building) {
      return undefined;
    }

    return plainToInstance(Building, building, {
      enableImplicitConversion: true,
    });
  }

  static toDto(building: Building): CreateBuildingDto {
    return plainToInstance(CreateBuildingDto, building, {
      enableImplicitConversion: true,
    });
  }
}
