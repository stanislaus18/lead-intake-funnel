import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { PictureUrl } from '../model';
import { PictureUrlDao } from '../dao';

export class PictureUrlDto {
  @ApiProperty({ description: 'Picture URL id' })
  @IsOptional()
  @IsString()
  readonly id?: string;

  @ApiProperty({ description: 'URL' })
  @IsString()
  @IsOptional()
  readonly url?: string;

  @ApiProperty({ description: 'Date when record was created' })
  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @ApiProperty({ description: 'Date when record was last updated' })
  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;

  static from(pictureUrl: PictureUrlDto): PictureUrlDao {
    return plainToInstance(PictureUrlDao, pictureUrl, {
      enableImplicitConversion: true,
    });
  }

  static toDto(pictureUrl: PictureUrl): PictureUrlDto {
    return plainToInstance(PictureUrlDto, pictureUrl, {
      enableImplicitConversion: true,
    });
  }
}
