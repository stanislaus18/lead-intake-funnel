import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { Marketing } from '../model';

export class MarketingDto {
  @ApiProperty({ description: 'Marketing id' })
  @IsOptional()
  @IsString()
  readonly id?: string;

  @ApiProperty({ description: 'Customer loyalty program type' })
  @IsString()
  @IsOptional()
  readonly customerLoyaltyProgramType?: string;

  @ApiProperty({ description: 'Customer loyalty program id' })
  @IsString()
  @IsOptional()
  readonly customerLoyaltyProgramId?: string;

  @ApiProperty({ description: 'Date when record was created' })
  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @ApiProperty({ description: 'Date when record was last updated' })
  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;

  static from(marketing: MarketingDto): Marketing | undefined {
    if (!marketing) {
      return undefined;
    }

    return plainToInstance(Marketing, marketing, {
      enableImplicitConversion: true,
    });
  }

  static toDto(marketing: Marketing): MarketingDto {
    return plainToInstance(MarketingDto, marketing, {
      enableImplicitConversion: true,
    });
  }
}
