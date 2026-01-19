import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { plainToInstance } from 'class-transformer';
import { IsOptional, IsString, IsDate, ValidateNested } from 'class-validator';
import { AddressDto } from './address.dto';
import { BuildingInformationDto } from './building-information.dto';
import { OwnershipRelationshipsDto } from './ownership-relationships.dto';
import { EnergyRelevantInformationDto } from './energy-relevant-information.dto';
import { HotWaterDto } from './hot-water.dto';

export class BuildingDto {
  @ApiProperty({ description: 'Version of the building data' })
  @IsOptional()
  @IsString()
  readonly version: string;

  @ApiProperty({ description: 'Lead ID associated with this building' })
  @IsOptional()
  @IsString()
  readonly leadId: string;

  @ApiProperty({ description: 'Type of building' })
  @IsOptional()
  @IsString()
  readonly type: string;

  @ApiProperty({ type: AddressDto, description: 'Address information' })
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  readonly address: AddressDto;

  @ApiProperty({
    type: BuildingInformationDto,
    description: 'Building information details',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => BuildingInformationDto)
  readonly buildingInformation: BuildingInformationDto;

  @ApiProperty({
    type: OwnershipRelationshipsDto,
    description: 'Ownership relationships details',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => OwnershipRelationshipsDto)
  readonly ownershipRelationships: OwnershipRelationshipsDto;

  @ApiProperty({
    type: EnergyRelevantInformationDto,
    description: 'Energy relevant information details',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => EnergyRelevantInformationDto)
  readonly energyRelevantInformation: EnergyRelevantInformationDto;

  @ApiProperty({ type: HotWaterDto, description: 'Hot water system details' })
  @IsOptional()
  @ValidateNested()
  @Type(() => HotWaterDto)
  readonly hotWater: HotWaterDto;

  @ApiProperty({ description: 'Date when record was created' })
  @IsOptional()
  @IsDate()
  readonly createdAt: Date;

  @ApiProperty({ description: 'Date when record was last updated' })
  @IsOptional()
  @IsDate()
  readonly updatedAt: Date;

  static from(data: BuildingDto): BuildingDto {
    return this.create({
      ...(data?.version && { version: data.version }),
      ...(data?.leadId && { leadId: data.leadId }),
      ...(data?.type && { type: data.type }),
      ...(data?.address && { address: AddressDto.from(data.address) }),
      ...(data?.buildingInformation && {
        buildingInformation: BuildingInformationDto.from(data.buildingInformation),
      }),
      ...(data?.ownershipRelationships && {
        ownershipRelationships: OwnershipRelationshipsDto.from(
          data.ownershipRelationships,
        ),
      }),
      ...(data?.energyRelevantInformation && {
        energyRelevantInformation: EnergyRelevantInformationDto.from(
          data.energyRelevantInformation,
        ),
      }),
      ...(data?.hotWater && { hotWater: HotWaterDto.from(data.hotWater) }),
      ...(data?.createdAt && { createdAt: data.createdAt }),
      ...(data?.updatedAt && { updatedAt: data.updatedAt }),
    });
  }

  static create(dto: BuildingDto): BuildingDto {
    return plainToInstance(BuildingDto, dto);
  }
}
