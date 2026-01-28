import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsNumber } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { HotWater } from '../model';

export class HotWaterDto {
  @ApiProperty({ description: 'Hot water id' })
  @IsOptional()
  @IsString()
  readonly id?: string;

  @ApiProperty({ description: 'Number of bathtubs. Number' })
  @IsNumber()
  @IsOptional()
  readonly numberOfBathtubs?: number;

  @ApiProperty({ description: 'Number of showers. Number' })
  @IsNumber()
  @IsOptional()
  readonly numberOfShowers?: number;

  @ApiProperty({
    description:
      'Type of showers. Possible values: "Duschkopf", "Raindance Duschkopf", "Wasserfall-Dusche"',
  })
  @IsString()
  @IsOptional()
  readonly typeOfShowers?: string;

  @ApiProperty({ description: 'Date when record was created' })
  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @ApiProperty({ description: 'Date when record was last updated' })
  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;

  static from(hotWater: HotWaterDto): HotWater | undefined {
    if (!hotWater) {
      return undefined;
    }

    return plainToInstance(HotWater, hotWater, {
      enableImplicitConversion: true,
    });
  }

  static toDto(hotWater: HotWater): HotWaterDto {
    return plainToInstance(HotWaterDto, hotWater, {
      enableImplicitConversion: true,
    });
  }
}
