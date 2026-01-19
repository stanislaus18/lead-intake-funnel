import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { IsOptional, IsNumber, IsString, IsEnum } from 'class-validator';
import { HeatingTypeEnum, HeatingLocationEnum } from '../types/enums';

export class EnergyRelevantInformationDto {
  @ApiProperty({ description: 'Heated area in square meters' })
  @IsOptional()
  @IsNumber()
  readonly heatedArea: number;

  @ApiProperty({ description: 'Heated area as string' })
  @IsOptional()
  @IsString()
  readonly heatedAreaString: string;

  @ApiProperty({
    description: 'Type of heating',
    enum: HeatingTypeEnum,
  })
  @IsOptional()
  @IsEnum(HeatingTypeEnum)
  readonly typeOfHeating: HeatingTypeEnum;

  @ApiProperty({
    description: 'Location of heating',
    enum: HeatingLocationEnum,
  })
  @IsOptional()
  @IsEnum(HeatingLocationEnum)
  readonly locationHeating: HeatingLocationEnum;

  @ApiProperty({ description: 'Apartment heating system (Yes/No)' })
  @IsOptional()
  @IsString()
  readonly apartmentHeatingSystem: string;

  static from(
    data: EnergyRelevantInformationDto,
  ): EnergyRelevantInformationDto {
    return this.create({
      ...(data?.heatedArea && { heatedArea: data.heatedArea }),
      ...(data?.heatedAreaString && { heatedAreaString: data.heatedAreaString }),
      ...(data?.typeOfHeating && { typeOfHeating: data.typeOfHeating }),
      ...(data?.locationHeating && { locationHeating: data.locationHeating }),
      ...(data?.apartmentHeatingSystem && {
        apartmentHeatingSystem: data.apartmentHeatingSystem,
      }),
    });
  }

  static create(dto: EnergyRelevantInformationDto): EnergyRelevantInformationDto {
    return plainToInstance(EnergyRelevantInformationDto, dto);
  }
}
