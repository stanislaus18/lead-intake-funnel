import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { IsOptional, IsString, IsEnum, IsNumber, IsBoolean } from 'class-validator';
import { OwnershipCategoryEnum, OwnershipTypeEnum } from '../types/enums';

export class OwnershipRelationshipsDto {
  @ApiProperty({
    description: 'Ownership relationship',
    enum: OwnershipTypeEnum,
  })
  @IsOptional()
  @IsEnum(OwnershipTypeEnum)
  readonly ownershipRelationship: OwnershipTypeEnum;

  @ApiProperty({ description: 'Explanation of ownership relationship' })
  @IsOptional()
  @IsString()
  readonly ownershipRelationshipExplanation: string;

  @ApiProperty({ description: 'Number of owners' })
  @IsOptional()
  @IsNumber()
  readonly numberOfOwners: number;

  @ApiProperty({ description: 'Owner occupied housing' })
  @IsOptional()
  @IsBoolean()
  readonly ownerOccupiedHousing: boolean;

  @ApiProperty({
    description: 'Ownership category',
    enum: OwnershipCategoryEnum,
  })
  @IsOptional()
  @IsEnum(OwnershipCategoryEnum)
  readonly type: OwnershipCategoryEnum;

  static from(data: OwnershipRelationshipsDto): OwnershipRelationshipsDto {
    return this.create({
      ...(data?.ownershipRelationship && {
        ownershipRelationship: data.ownershipRelationship,
      }),
      ...(data?.ownershipRelationshipExplanation && {
        ownershipRelationshipExplanation: data.ownershipRelationshipExplanation,
      }),
      ...(data?.numberOfOwners && { numberOfOwners: data.numberOfOwners }),
      ...(data?.ownerOccupiedHousing !== undefined && {
        ownerOccupiedHousing: data.ownerOccupiedHousing,
      }),
      ...(data?.type && { type: data.type }),
    });
  }

  static create(dto: OwnershipRelationshipsDto): OwnershipRelationshipsDto {
    return plainToInstance(OwnershipRelationshipsDto, dto);
  }
}
