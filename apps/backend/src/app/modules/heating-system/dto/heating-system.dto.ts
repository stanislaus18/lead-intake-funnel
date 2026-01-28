import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDate,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { HeatingSystem } from '../model';

export class HeatingSystemDto {
  @ApiProperty({ description: 'Heating system id' })
  @IsOptional()
  @IsString()
  readonly id?: string;

  @ApiProperty({ description: 'Consumption' })
  @IsNumber()
  @IsOptional()
  readonly consumption?: number;

  @ApiProperty({ description: 'Consumption unit' })
  @IsString()
  @IsOptional()
  readonly consumptionUnit?: string;

  @ApiProperty({ description: 'System type' })
  @IsString()
  @IsOptional()
  readonly systemType?: string;

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
  @IsString()
  @IsOptional()
  readonly domesticHotWaterCirculationPump?: string;

  @ApiProperty({ description: 'Domestic water station' })
  @IsString()
  @IsOptional()
  readonly domestic_water_station?: string;

  @ApiProperty({ description: 'Date when record was created' })
  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @ApiProperty({ description: 'Date when record was last updated' })
  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;

  static from(heatingSystem: HeatingSystemDto): HeatingSystem | undefined {
    if (!heatingSystem) {
      return undefined;
    }

    return plainToInstance(HeatingSystem, heatingSystem, {
      enableImplicitConversion: true,
    });
  }

  static toDto(heatingSystem: HeatingSystem): HeatingSystemDto {
    return plainToInstance(HeatingSystemDto, heatingSystem, {
      enableImplicitConversion: true,
    });
  }
}
