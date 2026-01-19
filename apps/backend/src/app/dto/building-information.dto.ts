import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';
import {
  ImmoTypeEnum,
  YesNoEnum,
  BoilerRoomSizeEnum,
  CeilingHeightEnum,
  RoomsBetweenHeatingEnum,
  LocationEnum,
  GroundingTypeEnum,
} from '../types/enums';

export class BuildingInformationDto {
  @ApiProperty({
    description: 'Type of property',
    enum: ImmoTypeEnum,
  })
  @IsOptional()
  @IsEnum(ImmoTypeEnum)
  readonly immoType: ImmoTypeEnum;

  @ApiProperty({
    description: 'Heritage protection status',
    enum: YesNoEnum,
  })
  @IsOptional()
  @IsEnum(YesNoEnum)
  readonly heritageProtection: YesNoEnum;

  @ApiProperty({ description: 'Year of construction' })
  @IsOptional()
  @IsNumber()
  readonly constructionYear: number;

  @ApiProperty({ description: 'Living space in square meters' })
  @IsOptional()
  @IsNumber()
  readonly livingSpace: number;

  @ApiProperty({ description: 'Construction year as string' })
  @IsOptional()
  @IsString()
  readonly constructionYearString: string;

  @ApiProperty({ description: 'Number of residential units' })
  @IsOptional()
  @IsNumber()
  readonly residentialUnits: number;

  @ApiProperty({
    description: 'Size of boiler room',
    enum: BoilerRoomSizeEnum,
  })
  @IsOptional()
  @IsEnum(BoilerRoomSizeEnum)
  readonly boilerRoomSize: BoilerRoomSizeEnum;

  @ApiProperty({
    description: 'Ceiling height at installation location',
    enum: CeilingHeightEnum,
  })
  @IsOptional()
  @IsEnum(CeilingHeightEnum)
  readonly installationLocationCeilingHeight: CeilingHeightEnum;

  @ApiProperty({
    description: 'Width of pathway to outdoor unit',
    enum: YesNoEnum,
  })
  @IsOptional()
  @IsEnum(YesNoEnum)
  readonly widthPathway: YesNoEnum;

  @ApiProperty({
    description: 'Height of pathway to outdoor unit',
    enum: YesNoEnum,
  })
  @IsOptional()
  @IsEnum(YesNoEnum)
  readonly heightPathway: YesNoEnum;

  @ApiProperty({
    description: 'Number of rooms between heating room and outdoor unit',
    enum: RoomsBetweenHeatingEnum,
  })
  @IsOptional()
  @IsEnum(RoomsBetweenHeatingEnum)
  readonly roomsBetweenHeatingRoomAndOutdoorUnit: RoomsBetweenHeatingEnum;

  @ApiProperty({
    description: 'Location of meter closet',
    enum: LocationEnum,
  })
  @IsOptional()
  @IsEnum(LocationEnum)
  readonly meterClosetLocation: LocationEnum;

  @ApiProperty({
    description: 'Location of electricity connection',
    enum: LocationEnum,
  })
  @IsOptional()
  @IsEnum(LocationEnum)
  readonly electricityConnectionLocation: LocationEnum;

  @ApiProperty({
    description: 'Type of grounding',
    enum: GroundingTypeEnum,
  })
  @IsOptional()
  @IsEnum(GroundingTypeEnum)
  readonly groundingType: GroundingTypeEnum;

  @ApiProperty({ description: 'Has solar thermal system' })
  @IsOptional()
  @IsBoolean()
  readonly hasSolarThermalSystem: boolean;

  @ApiProperty({ description: 'Number of persons in household' })
  @IsOptional()
  @IsNumber()
  readonly personsHousehold: number;

  static from(data: BuildingInformationDto): BuildingInformationDto {
    return this.create({
      ...(data?.immoType && { immoType: data.immoType }),
      ...(data?.heritageProtection && { heritageProtection: data.heritageProtection }),
      ...(data?.constructionYear && { constructionYear: data.constructionYear }),
      ...(data?.livingSpace && { livingSpace: data.livingSpace }),
      ...(data?.constructionYearString && { constructionYearString: data.constructionYearString }),
      ...(data?.residentialUnits && { residentialUnits: data.residentialUnits }),
      ...(data?.boilerRoomSize && { boilerRoomSize: data.boilerRoomSize }),
      ...(data?.installationLocationCeilingHeight && { installationLocationCeilingHeight: data.installationLocationCeilingHeight }),
      ...(data?.widthPathway && { widthPathway: data.widthPathway }),
      ...(data?.heightPathway && { heightPathway: data.heightPathway }),
      ...(data?.roomsBetweenHeatingRoomAndOutdoorUnit && { roomsBetweenHeatingRoomAndOutdoorUnit: data.roomsBetweenHeatingRoomAndOutdoorUnit }),
      ...(data?.meterClosetLocation && { meterClosetLocation: data.meterClosetLocation }),
      ...(data?.electricityConnectionLocation && { electricityConnectionLocation: data.electricityConnectionLocation }),
      ...(data?.groundingType && { groundingType: data.groundingType }),
      ...(data?.hasSolarThermalSystem !== undefined && { hasSolarThermalSystem: data.hasSolarThermalSystem }),
      ...(data?.personsHousehold && { personsHousehold: data.personsHousehold }),
    });
  }

  static create(dto: BuildingInformationDto): BuildingInformationDto {
    return plainToInstance(BuildingInformationDto, dto);
  }
}
