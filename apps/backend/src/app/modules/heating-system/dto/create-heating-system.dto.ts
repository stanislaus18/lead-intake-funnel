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

import { HeatingSystem } from '../model';
import {
  ConsumptionUnitEnum,
  DomesticHotWaterPumpEnum,
  DomesticWaterStationEnum,
  HeatingSystemTypeEnum,
} from '../enum';

export class CreateHeatingSystemDto {
  @ApiProperty({ description: 'Consumption' })
  @IsNumber()
  @IsOptional()
  readonly consumption?: number;

  @ApiProperty({ description: 'Consumption unit' })
  @IsEnum(ConsumptionUnitEnum)
  @IsOptional()
  readonly consumptionUnit?: ConsumptionUnitEnum;

  @ApiProperty({ description: 'System type' })
  @IsEnum(HeatingSystemTypeEnum)
  @IsOptional()
  readonly systemType?: HeatingSystemTypeEnum;

  @ApiProperty({ description: 'Construction year heating system' })
  @IsNumber()
  @IsOptional()
  readonly constructionYearHeatingSystem?: number;

  @ApiProperty({ description: 'Construction year heating system string' })
  @IsString()
  @IsOptional()
  readonly constructionYearHeatingSystemString?: string;

  @ApiProperty({ description: 'Model' })
  @IsString()
  @IsOptional()
  readonly model?: string;

  @ApiProperty({ description: 'Floor heating connected to return pipe' })
  @IsBoolean()
  @IsOptional()
  readonly floorHeatingConnectedToReturnPipe?: boolean;

  @ApiProperty({ description: 'Floor heating own heating circuit' })
  @IsBoolean()
  @IsOptional()
  readonly floorHeatingOwnHeatingCircuit?: boolean;

  @ApiProperty({ description: 'Floor heating only in small rooms' })
  @IsBoolean()
  @IsOptional()
  readonly floorHeatingOnlyInSmallRooms?: boolean;

  @ApiProperty({ description: 'Number of floor heating distributors' })
  @IsNumber()
  @IsOptional()
  readonly numberOfFloorHeatingDistributors?: number;

  @ApiProperty({ description: 'Number of radiators' })
  @IsNumber()
  @IsOptional()
  readonly numberOfRadiators?: number;

  @ApiProperty({ description: 'Domestic hot water by heatpump' })
  @IsBoolean()
  @IsOptional()
  readonly domesticHotWaterByHeatpump?: boolean;

  @ApiProperty({ description: 'Domestic hot water circulation pump' })
  @IsEnum(DomesticHotWaterPumpEnum)
  @IsOptional()
  readonly domesticHotWaterCirculationPump?: DomesticHotWaterPumpEnum;

  @ApiProperty({ description: 'Domestic water station' })
  @IsEnum(DomesticWaterStationEnum)
  @IsOptional()
  readonly domestic_water_station?: DomesticWaterStationEnum;

  @ApiProperty({ description: 'Date when record was created' })
  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @ApiProperty({ description: 'Date when record was last updated' })
  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;

  static from(heatingSystem: CreateHeatingSystemDto): HeatingSystem {
    return plainToInstance(HeatingSystem, heatingSystem, {
      enableImplicitConversion: true,
    });
  }

  static toDto(heatingSystem: HeatingSystem): CreateHeatingSystemDto {
    return plainToInstance(CreateHeatingSystemDto, heatingSystem, {
      enableImplicitConversion: true,
    });
  }
}
