import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { IsOptional, IsNumber, IsString, IsEnum, IsBoolean } from 'class-validator';
import {
  ConsumptionUnitEnum,
  HeatingSystemTypeEnum,
  DomesticHotWaterPumpEnum,
  DomesticWaterStationEnum,
} from '../types/enums';

export class HeatingSystemDto {
  @ApiProperty({ description: 'Consumption amount' })
  @IsOptional()
  @IsNumber()
  readonly consumption: number;

  @ApiProperty({
    description: 'Consumption unit',
    enum: ConsumptionUnitEnum,
  })
  @IsOptional()
  @IsEnum(ConsumptionUnitEnum)
  readonly consumptionUnit: ConsumptionUnitEnum;

  @ApiProperty({
    description: 'System type',
    enum: HeatingSystemTypeEnum,
  })
  @IsOptional()
  @IsEnum(HeatingSystemTypeEnum)
  readonly systemType: HeatingSystemTypeEnum;

  @ApiProperty({ description: 'Construction year of heating system' })
  @IsOptional()
  @IsNumber()
  readonly constructionYearHeatingSystem: number;

  @ApiProperty({ description: 'Construction year as string' })
  @IsOptional()
  @IsString()
  readonly constructionYearHeatingSystemString: string;

  @ApiProperty({ description: 'Heating system model' })
  @IsOptional()
  @IsString()
  readonly model: string;

  @ApiProperty({ description: 'Floor heating connected to return pipe' })
  @IsOptional()
  @IsBoolean()
  readonly floorHeatingConnectedToReturnPipe: boolean;

  @ApiProperty({ description: 'Floor heating own heating circuit' })
  @IsOptional()
  @IsBoolean()
  readonly floorHeatingOwnHeatingCircuit: boolean;

  @ApiProperty({ description: 'Floor heating only in small rooms' })
  @IsOptional()
  @IsBoolean()
  readonly floorHeatingOnlyInSmallRooms: boolean;

  @ApiProperty({ description: 'Number of floor heating distributors' })
  @IsOptional()
  @IsNumber()
  readonly numberOfFloorHeatingDistributors: number;

  @ApiProperty({ description: 'Number of radiators' })
  @IsOptional()
  @IsNumber()
  readonly numberOfRadiators: number;

  @ApiProperty({ description: 'Domestic hot water by heatpump' })
  @IsOptional()
  @IsBoolean()
  readonly domesticHotWaterByHeatpump: boolean;

  @ApiProperty({
    description: 'Domestic hot water circulation pump',
    enum: DomesticHotWaterPumpEnum,
  })
  @IsOptional()
  @IsEnum(DomesticHotWaterPumpEnum)
  readonly domesticHotWaterCirculationPump: DomesticHotWaterPumpEnum;

  @ApiProperty({
    description: 'Domestic water station',
    enum: DomesticWaterStationEnum,
  })
  @IsOptional()
  @IsEnum(DomesticWaterStationEnum)
  readonly domestic_water_station: DomesticWaterStationEnum;

  static from(data: HeatingSystemDto): HeatingSystemDto {
    return this.create({
      ...(data?.consumption && { consumption: data.consumption }),
      ...(data?.consumptionUnit && { consumptionUnit: data.consumptionUnit }),
      ...(data?.systemType && { systemType: data.systemType }),
      ...(data?.constructionYearHeatingSystem && {
        constructionYearHeatingSystem: data.constructionYearHeatingSystem,
      }),
      ...(data?.constructionYearHeatingSystemString && {
        constructionYearHeatingSystemString: data.constructionYearHeatingSystemString,
      }),
      ...(data?.model && { model: data.model }),
      ...(data?.floorHeatingConnectedToReturnPipe !== undefined && {
        floorHeatingConnectedToReturnPipe: data.floorHeatingConnectedToReturnPipe,
      }),
      ...(data?.floorHeatingOwnHeatingCircuit !== undefined && {
        floorHeatingOwnHeatingCircuit: data.floorHeatingOwnHeatingCircuit,
      }),
      ...(data?.floorHeatingOnlyInSmallRooms !== undefined && {
        floorHeatingOnlyInSmallRooms: data.floorHeatingOnlyInSmallRooms,
      }),
      ...(data?.numberOfFloorHeatingDistributors && {
        numberOfFloorHeatingDistributors: data.numberOfFloorHeatingDistributors,
      }),
      ...(data?.numberOfRadiators && {
        numberOfRadiators: data.numberOfRadiators,
      }),
      ...(data?.domesticHotWaterByHeatpump !== undefined && {
        domesticHotWaterByHeatpump: data.domesticHotWaterByHeatpump,
      }),
      ...(data?.domesticHotWaterCirculationPump && {
        domesticHotWaterCirculationPump: data.domesticHotWaterCirculationPump,
      }),
      ...(data?.domestic_water_station && {
        domestic_water_station: data.domestic_water_station,
      }),
    });
  }

  static create(dto: HeatingSystemDto): HeatingSystemDto {
    return plainToInstance(HeatingSystemDto, dto);
  }
}
