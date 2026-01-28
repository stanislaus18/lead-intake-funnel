import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDate,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { plainToInstance } from 'class-transformer';

import { Pictures } from '../model';
import { PictureUrlDto } from '../../picture-url/dto';

export class CreatePicturesDto {
  @ApiProperty({ description: 'Pictures id' })
  @IsOptional()
  @IsString()
  readonly id?: string;

  @ApiProperty({
    type: [PictureUrlDto],
    description: 'Outdoor unit location pictures',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  @IsOptional()
  readonly outdoorUnitLocation?: PictureUrlDto[];

  @ApiProperty({
    type: [PictureUrlDto],
    description: 'Outdoor unit location with area pictures',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  @IsOptional()
  readonly outdoorUnitLocationWithArea?: PictureUrlDto[];

  @ApiProperty({
    type: [PictureUrlDto],
    description: 'Heating room pictures',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  @IsOptional()
  readonly heatingRoom?: PictureUrlDto[];

  @ApiProperty({
    type: [PictureUrlDto],
    description: 'Meter closet with door open pictures',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  @IsOptional()
  readonly meterClosetWithDoorOpen?: PictureUrlDto[];

  @ApiProperty({
    type: [PictureUrlDto],
    description: 'Meter closet SLS switch detailed pictures',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  @IsOptional()
  readonly meterClosetSlsSwitchDetailed?: PictureUrlDto[];

  @ApiProperty({
    type: [PictureUrlDto],
    description: 'Floor heating distribution with door open pictures',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  @IsOptional()
  readonly floorHeatingDistributionWithDoorOpen?: PictureUrlDto[];

  @ApiProperty({ description: 'Date when record was created' })
  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @ApiProperty({ description: 'Date when record was last updated' })
  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;

  static from(pictures: CreatePicturesDto): Pictures | undefined {
    if (!pictures) {
      return undefined;
    }

    return plainToInstance(Pictures, pictures, {
      enableImplicitConversion: true,
    });
  }

  static toDto(pictures: Pictures): CreatePicturesDto {
    return plainToInstance(CreatePicturesDto, pictures, {
      enableImplicitConversion: true,
    });
  }
}
