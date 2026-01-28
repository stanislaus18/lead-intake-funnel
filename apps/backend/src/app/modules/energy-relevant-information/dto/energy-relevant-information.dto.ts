import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDate,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { EnergyRelevantInformation } from '../model';
import { HeatingLocationEnum, HeatingTypeEnum, YesNoEnum } from '../enum';

export class EnergyRelevantInformationDto {
  @ApiProperty({ description: 'Energy relevant information id' })
  @IsOptional()
  @IsString()
  readonly id?: string;

  @ApiProperty({
    description: 'Heated area. Optional, Recommended for qualification. Number',
  })
  @IsNumber()
  @IsOptional()
  readonly heatedArea?: number;

  @ApiProperty({ description: 'Heated area string. Format: e.g. "185 qm²"' })
  @IsString()
  @IsOptional()
  readonly heatedAreaString?: string;

  @ApiProperty({
    description:
      'Type of heating. Optional, Recommended for discovery. Possible values: "Heizkörper", "Fußbodenheizung", "Heizkörper + Fußbodenheizung", "Nachtspeicherofen", "Sonstiges"',
  })
  @IsEnum(HeatingTypeEnum)
  @IsOptional()
  readonly typeOfHeating?: HeatingTypeEnum;

  @ApiProperty({
    description:
      'Location of heating system. Optional, Recommended for discovery. Possible values: "Unterm Dach", "Im Keller", "Im EG", "1.OG", "Dachgeschoss", "Obergeschoss", "Keller", "Erdgeschoss"',
  })
  @IsEnum(HeatingLocationEnum)
  @IsOptional()
  readonly locationHeating?: HeatingLocationEnum;

  @ApiProperty({
    description:
      'Apartment heating system. Required if immoType is "Wohnung". Possible values: "Yes", "No"',
  })
  @IsEnum(YesNoEnum)
  @IsOptional()
  readonly apartmentHeatingSystem?: YesNoEnum;

  @ApiProperty({ description: 'Date when record was created' })
  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @ApiProperty({ description: 'Date when record was last updated' })
  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;

  static from(
    energyRelevantInformation: EnergyRelevantInformationDto,
  ): EnergyRelevantInformation {
    return plainToInstance(
      EnergyRelevantInformation,
      energyRelevantInformation,
      {
        enableImplicitConversion: true,
      },
    );
  }

  static toDto(
    energyRelevantInformation: EnergyRelevantInformation,
  ): EnergyRelevantInformationDto {
    return plainToInstance(
      EnergyRelevantInformationDto,
      energyRelevantInformation,
      {
        enableImplicitConversion: true,
      },
    );
  }
}
