import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDate,
  IsNumber,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { BuildingInformation } from '../model';
import {
  BoilerRoomSizeEnum,
  CeilingHeightEnum,
  GroundingTypeEnum,
  ImmoTypeEnum,
  LocationEnum,
  RoomsBetweenHeatingEnum,
  YesNoEnum,
} from '../enum';

export class BuildingInformationDto {
  @ApiProperty({ description: 'Building information id' })
  @IsOptional()
  @IsString()
  readonly id?: string;

  @ApiProperty({
    description:
      'Recommended for qualification. Possible choices: Einfamilienhaus / Zweifamilienhaus, Doppelhaus / Reihenhaus, Wohnung, Gewerbe, Mehrfamilienhaus, Sonstiges',
  })
  @IsEnum(ImmoTypeEnum)
  @IsOptional()
  readonly immoType: ImmoTypeEnum;

  @ApiProperty({
    description:
      'Heritage protection. Recommended for qualification. If the building has heritage Protection, possible values "Ja", "Nein"',
  })
  @IsEnum(YesNoEnum)
  @IsOptional()
  readonly heritageProtection?: YesNoEnum;

  @ApiProperty({
    description: 'Construction year (YYYY). Recommended for selling. Number',
  })
  @IsNumber()
  @IsOptional()
  readonly constructionYear?: number;

  @ApiProperty({
    description:
      'Living space in square meters. Recommended for selling. The size in square meter of the living area (heated area is normally = or less than this number)',
  })
  @IsNumber()
  @IsOptional()
  readonly livingSpace?: number;

  @ApiProperty({
    description:
      'Construction year string. Recommended for selling. If the exact year is not known only a range',
  })
  @IsString()
  @IsOptional()
  readonly constructionYearString?: string;

  @ApiProperty({
    description: 'Residential units. Recommended for discovery. Number',
  })
  @IsNumber()
  @IsOptional()
  readonly residentialUnits?: number;

  @ApiProperty({
    description:
      'Boiler room size. Optional, Recommended for discovery. Possible choices: "weniger als 4qm", "mehr als 4 qm"',
  })
  @IsEnum(BoilerRoomSizeEnum)
  @IsOptional()
  readonly boilerRoomSize?: BoilerRoomSizeEnum;

  @ApiProperty({
    description:
      'Installation location ceiling height. Optional, Recommended for discovery. Possible choices: "niedriger als 180 cm", "180 - 199 cm", "höher als 199 cm"',
  })
  @IsEnum(CeilingHeightEnum)
  @IsOptional()
  readonly installationLocationCeilingHeight?: CeilingHeightEnum;

  @ApiProperty({
    description:
      'Width pathway. Optional, Recommended for discovery. Possible choices: "Ja", "Nein"',
  })
  @IsEnum(YesNoEnum)
  @IsOptional()
  readonly widthPathway?: YesNoEnum;
  @ApiProperty({
    description:
      'Height pathway. Optional, Recommended for discovery. Possible choices: "Ja", "Nein"',
  })
  @IsEnum(YesNoEnum)
  @IsOptional()
  readonly heightPathway?: YesNoEnum;

  @ApiProperty({
    description:
      'Rooms between heating room and outdoor unit. Optional, Recommended for selling. Possible choices: "no_room", "one_room", "two_rooms_or_more"',
  })
  @IsEnum(RoomsBetweenHeatingEnum)
  @IsOptional()
  readonly roomsBetweenHeatingRoomAndOutdoorUnit?: RoomsBetweenHeatingEnum;

  @ApiProperty({
    description:
      'Meter closet location. Optional, Recommended for selling. Possible choices: "Keller", "Ergeschoss", "Obergeschoss", "Dachgeschoss"',
  })
  @IsEnum(LocationEnum)
  @IsOptional()
  readonly meterClosetLocation?: LocationEnum;

  @ApiProperty({
    description:
      'Electricity connection location. Optional, Recommended for selling. Possible choices: "Keller", "Ergeschoss", "Obergeschoss", "Dachgeschoss"',
  })
  @IsEnum(LocationEnum)
  @IsOptional()
  readonly electricityConnectionLocation?: LocationEnum;

  @ApiProperty({
    description:
      'Grounding type. Recommended for selling. Possible choices: "water_or_gas_pipe", "grounding_spike_or_foundation", "no_grounding", "unknown"',
  })
  @IsEnum(GroundingTypeEnum)
  @IsOptional()
  readonly groundingType?: GroundingTypeEnum;

  @ApiProperty({
    description:
      'Has solar thermal system. Recommended for selling. Boolean: true, false',
  })
  @IsBoolean()
  @IsOptional()
  readonly hasSolarThermalSystem?: boolean;

  @ApiProperty({
    description:
      'Persons in household. Recommended for selling. Number of people in the household',
  })
  @IsNumber()
  @IsOptional()
  readonly personsHousehold?: number;

  @ApiProperty({ description: 'Date when record was created' })
  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @ApiProperty({ description: 'Date when record was last updated' })
  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;

  static from(
    buildingInformation: BuildingInformationDto,
  ): BuildingInformation {
    return plainToInstance(BuildingInformation, buildingInformation, {
      enableImplicitConversion: true,
    });
  }

  static toDto(
    buildingInformation: BuildingInformation,
  ): BuildingInformationDto {
    return plainToInstance(BuildingInformationDto, buildingInformation, {
      enableImplicitConversion: true,
    });
  }
}
