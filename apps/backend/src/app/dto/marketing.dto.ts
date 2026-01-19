import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class MarketingDto {
  @ApiProperty({ description: 'Customer loyalty program type' })
  @IsOptional()
  @IsString()
  readonly customerLoyaltyProgramType: string;

  @ApiProperty({ description: 'Customer loyalty program ID' })
  @IsOptional()
  @IsString()
  readonly customerLoyaltyProgramId: string;

  static from(data: MarketingDto): MarketingDto {
    return this.create({
      ...(data?.customerLoyaltyProgramType && {
        customerLoyaltyProgramType: data.customerLoyaltyProgramType,
      }),
      ...(data?.customerLoyaltyProgramId && {
        customerLoyaltyProgramId: data.customerLoyaltyProgramId,
      }),
    });
  }

  static create(dto: MarketingDto): MarketingDto {
    return plainToInstance(MarketingDto, dto);
  }
}
