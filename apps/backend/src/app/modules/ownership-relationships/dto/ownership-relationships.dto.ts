import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDate,
  IsNumber,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { OwnershipRelationships } from '../model';
import { OwnershipCategoryEnum } from '../enum';

export class OwnershipRelationshipsDto {
  @ApiProperty({ description: 'Ownership relationships id' })
  @IsOptional()
  @IsString()
  readonly id?: string;

  @ApiProperty({
    description:
      'Ownership relationship. DEPRECATED Optional, empfohlen. Possible values: "Eigentümer", "Teileigentümer", "Sonstiges"',
  })
  @IsString()
  @IsOptional()
  readonly ownershipRelationship?: string;

  @ApiProperty({
    description:
      'Ownership relationship explanation. DEPRECATED Required if ownershipRelationship is "Teileigentümer" or "Sonstiges"',
  })
  @IsString()
  @IsOptional()
  readonly ownershipRelationshipExplanation?: string;

  @ApiProperty({
    description:
      'Number of owners. DEPRECATED Required if ownershipRelationship is "Teileigentümer" or "Sonstiges". Number',
  })
  @IsNumber()
  @IsOptional()
  readonly numberOfOwners?: number;

  @ApiProperty({
    description:
      'Owner occupied housing. Recommended for selling. Boolean: true, false',
  })
  @IsBoolean()
  @IsOptional()
  readonly ownerOccupiedHousing?: boolean;

  @ApiProperty({
    description:
      'Type of ownership. Recommended for selling. Possible values: "one_owner", "two_owners", "community_of_owners"',
  })
  @IsEnum(OwnershipCategoryEnum)
  @IsOptional()
  readonly type?: OwnershipCategoryEnum;

  @ApiProperty({ description: 'Date when record was created' })
  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @ApiProperty({ description: 'Date when record was last updated' })
  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;

  static from(
    ownershipRelationships: OwnershipRelationshipsDto,
  ): OwnershipRelationships {
    return plainToInstance(OwnershipRelationships, ownershipRelationships, {
      enableImplicitConversion: true,
    });
  }

  static toDto(
    ownershipRelationships: OwnershipRelationships,
  ): OwnershipRelationshipsDto {
    return plainToInstance(OwnershipRelationshipsDto, ownershipRelationships, {
      enableImplicitConversion: true,
    });
  }
}
