import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { IsOptional, IsNumber, IsEnum } from 'class-validator';
import { ShowerTypeEnum } from '../types/enums';

export class HotWaterDto {
  @ApiProperty({ description: 'Number of bathtubs' })
  @IsOptional()
  @IsNumber()
  readonly numberOfBathtubs: number;

  @ApiProperty({ description: 'Number of showers' })
  @IsOptional()
  @IsNumber()
  readonly numberOfShowers: number;

  @ApiProperty({
    description: 'Type of showers',
    enum: ShowerTypeEnum,
  })
  @IsOptional()
  @IsEnum(ShowerTypeEnum)
  readonly typeOfShowers: ShowerTypeEnum;

  static from(data: HotWaterDto): HotWaterDto {
    return this.create({
      ...(data?.numberOfBathtubs && { numberOfBathtubs: data.numberOfBathtubs }),
      ...(data?.numberOfShowers && { numberOfShowers: data.numberOfShowers }),
      ...(data?.typeOfShowers && { typeOfShowers: data.typeOfShowers }),
    });
  }

  static create(dto: HotWaterDto): HotWaterDto {
    return plainToInstance(HotWaterDto, dto);
  }
}
