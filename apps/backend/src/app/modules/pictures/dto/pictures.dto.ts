import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsArray } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { Pictures } from '../model';

export class PicturesDto {
  @ApiProperty({ description: 'Pictures id' })
  @IsOptional()
  @IsString()
  readonly id?: string;

  @ApiProperty({
    type: [String],
    description: 'Outdoor unit location pictures',
  })
  @IsArray()
  @IsOptional()
  readonly outdoorUnitLocation?: string[];

  @ApiProperty({
    type: [String],
    description: 'Outdoor unit location with area pictures',
  })
  @IsArray()
  @IsOptional()
  readonly outdoorUnitLocationWithArea?: string[];

  @ApiProperty({
    type: [String],
    description: 'Heating room pictures',
  })
  @IsArray()
  @IsOptional()
  readonly heatingRoom?: string[];

  @ApiProperty({
    type: [String],
    description: 'Meter closet with door open pictures',
  })
  @IsArray()
  @IsOptional()
  readonly meterClosetWithDoorOpen?: string[];

  @ApiProperty({
    type: [String],
    description: 'Outdoor unit pictures',
  })
  @IsArray()
  @IsOptional()
  readonly outdoorUnit?: string[];

  @ApiProperty({
    type: [String],
    description: 'Electrical connection for heatpump pictures',
  })
  @IsArray()
  @IsOptional()
  readonly electricalConnectionForHeatpump?: string[];

  @ApiProperty({ description: 'Date when record was created' })
  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @ApiProperty({ description: 'Date when record was last updated' })
  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;

  static from(pictures: PicturesDto): Pictures | undefined {
    if (!pictures) {
      return undefined;
    }

    return plainToInstance(Pictures, pictures, {
      enableImplicitConversion: true,
    });
  }

  static toDto(pictures: Pictures): PicturesDto {
    return plainToInstance(PicturesDto, pictures, {
      enableImplicitConversion: true,
    });
  }
}
