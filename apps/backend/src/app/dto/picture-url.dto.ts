import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import {
  IsOptional,
  IsString,
} from 'class-validator';

export class PictureUrlDto {
  @ApiProperty({ description: 'URL to the picture' })
  @IsOptional()
  @IsString()
  readonly url: string;

  static from(data: PictureUrlDto): PictureUrlDto {
    return this.create({
      ...(data?.url && { url: data.url }),
    });
  }

  static create(dto: PictureUrlDto): PictureUrlDto {
    return plainToInstance(PictureUrlDto, dto);
  }
}