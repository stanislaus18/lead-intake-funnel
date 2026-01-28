import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDate,
  IsBoolean,
  IsArray,
  IsEnum,
} from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { Project } from '../model';
import { DisposalTypeEnum } from '../enum';

export class ProjectDto {
  @ApiProperty({ description: 'Project id' })
  @IsOptional()
  @IsString()
  readonly id?: string;

  @ApiProperty({
    description: 'Project timeline',
  })
  @IsString()
  @IsOptional()
  readonly timeline?: string;

  @ApiProperty({
    description: 'Household income',
  })
  @IsString()
  @IsOptional()
  readonly householdIncome?: string;

  @ApiProperty({
    description: 'Status of foundation construction',
  })
  @IsString()
  @IsOptional()
  readonly statusOfFoundationConstruction?: string;

  @ApiProperty({ description: 'Additional information from lead source' })
  @IsString()
  @IsOptional()
  readonly infosLeadsource?: string;

  @ApiProperty({ description: 'Full replacement of heating system planned' })
  @IsBoolean()
  @IsOptional()
  readonly fullReplacementOfHeatingSystemPlanned?: boolean;

  @ApiProperty({
    type: [String],
    enum: DisposalTypeEnum,
    description:
      'Additional disposal options. Possible values: oil_tank_plastic_up_to_5000l, oil_tank_plastic_more_than_5000l, oil_tank_steel_up_to_5000l, oil_tank_steel_more_than_5000l, heatpump, liquid_gas_tank',
  })
  @IsArray()
  @IsEnum(DisposalTypeEnum, { each: true })
  @IsOptional()
  readonly additionalDisposal?: DisposalTypeEnum[];

  @ApiProperty({ description: 'Should keep solar thermal system' })
  @IsBoolean()
  @IsOptional()
  readonly shouldKeepSolarThermalSystem?: boolean;

  @ApiProperty({ description: 'Pictures ID reference' })
  @IsString()
  @IsOptional()
  readonly picturesId?: string;

  @ApiProperty({ description: 'Date when record was created' })
  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @ApiProperty({ description: 'Date when record was last updated' })
  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;

  static from(project: ProjectDto): Project | undefined {
    if (!project) {
      return undefined;
    }

    return plainToInstance(Project, project, {
      enableImplicitConversion: true,
    });
  }

  static toDto(project: Project): ProjectDto {
    return plainToInstance(ProjectDto, project, {
      enableImplicitConversion: true,
    });
  }
}
