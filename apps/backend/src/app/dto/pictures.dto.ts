import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { plainToInstance } from 'class-transformer';
import {
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { PictureUrlDto } from './picture-url.dto';

export class PicturesDto {
  @ApiProperty({
    type: [PictureUrlDto],
    description: 'Outdoor unit location pictures',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  readonly outdoorUnitLocation: PictureUrlDto[];

  @ApiProperty({
    type: [PictureUrlDto],
    description: 'Outdoor unit location with area pictures',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  readonly outdoorUnitLocationWithArea: PictureUrlDto[];

  @ApiProperty({ type: [PictureUrlDto], description: 'Heating room pictures' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  readonly heatingRoom: PictureUrlDto[];

  @ApiProperty({
    type: [PictureUrlDto],
    description: 'Meter closet with door open pictures',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  readonly meterClosetWithDoorOpen: PictureUrlDto[];

  @ApiProperty({
    type: [PictureUrlDto],
    description: 'Meter closet SLS switch detailed pictures',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  readonly meterClosetSlsSwitchDetailed: PictureUrlDto[];

  @ApiProperty({
    type: [PictureUrlDto],
    description: 'Floor heating distribution with door open pictures',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  readonly floorHeatingDistributionWithDoorOpen: PictureUrlDto[];

  static from(data: PicturesDto): PicturesDto {
    return this.create({
      ...(data?.outdoorUnitLocation && {
        outdoorUnitLocation: data.outdoorUnitLocation.map((p) =>
          PictureUrlDto.from(p),
        ),
      }),
      ...(data?.outdoorUnitLocationWithArea && {
        outdoorUnitLocationWithArea: data.outdoorUnitLocationWithArea.map((p) =>
          PictureUrlDto.from(p),
        ),
      }),
      ...(data?.heatingRoom && {
        heatingRoom: data.heatingRoom.map((p) => PictureUrlDto.from(p)),
      }),
      ...(data?.meterClosetWithDoorOpen && {
        meterClosetWithDoorOpen: data.meterClosetWithDoorOpen.map((p) =>
          PictureUrlDto.from(p),
        ),
      }),
      ...(data?.meterClosetSlsSwitchDetailed && {
        meterClosetSlsSwitchDetailed: data.meterClosetSlsSwitchDetailed.map(
          (p) => PictureUrlDto.from(p),
        ),
      }),
      ...(data?.floorHeatingDistributionWithDoorOpen && {
        floorHeatingDistributionWithDoorOpen: data.floorHeatingDistributionWithDoorOpen.map(
          (p) => PictureUrlDto.from(p),
        ),
      }),
    });
  }

  static create(dto: PicturesDto): PicturesDto {
    return plainToInstance(PicturesDto, dto);
  }
}
