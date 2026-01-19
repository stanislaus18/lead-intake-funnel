import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { plainToInstance } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsArray,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { DisposalTypeEnum, FoundationStatusEnum, TimelineEnum } from '../types/enums';
import { HouseholdIncomeEnum } from '../types/enums/household-income.enum';
import { PicturesDto } from './pictures.dto';

export class ProjectDto {
  @ApiProperty({
    description: 'Project timeline',
    enum: TimelineEnum,
  })
  @IsOptional()
  @IsEnum(TimelineEnum)
  readonly timeline: TimelineEnum;

  @ApiProperty({
    description: 'Household income',
    enum: HouseholdIncomeEnum,
  })
  @IsOptional()
  @IsEnum(HouseholdIncomeEnum)
  readonly householdIncome: HouseholdIncomeEnum;

  @ApiProperty({
    description: 'Status of foundation construction',
    enum: FoundationStatusEnum,
  })
  @IsOptional()
  @IsEnum(FoundationStatusEnum)
  readonly statusOfFoundationConstruction: FoundationStatusEnum;

  @ApiProperty({ description: 'Additional information from lead source' })
  @IsOptional()
  @IsString()
  readonly infosLeadsource: string;

  @ApiProperty({ description: 'Full replacement of heating system planned' })
  @IsOptional()
  @IsBoolean()
  readonly fullReplacementOfHeatingSystemPlanned: boolean;

  @ApiProperty({
    type: [String],
    description: 'Additional disposal options',
    enum: DisposalTypeEnum,
  })
  @IsOptional()
  @IsArray()
  readonly additionalDisposal: DisposalTypeEnum[];

  @ApiProperty({ description: 'Should keep solar thermal system' })
  @IsOptional()
  @IsBoolean()
  readonly shouldKeepSolarThermalSystem: boolean;

  @ApiProperty({ type: PicturesDto, description: 'Project pictures' })
  @IsOptional()
  @ValidateNested()
  @Type(() => PicturesDto)
  readonly pictures: PicturesDto;

  static from(data: ProjectDto): ProjectDto {
    return this.create({
      ...(data?.timeline && { timeline: data.timeline }),
      ...(data?.householdIncome && { householdIncome: data.householdIncome }),
      ...(data?.statusOfFoundationConstruction && {
        statusOfFoundationConstruction: data.statusOfFoundationConstruction,
      }),
      ...(data?.infosLeadsource && { infosLeadsource: data.infosLeadsource }),
      ...(data?.fullReplacementOfHeatingSystemPlanned !== undefined && {
        fullReplacementOfHeatingSystemPlanned:
          data.fullReplacementOfHeatingSystemPlanned,
      }),
      ...(data?.additionalDisposal && {
        additionalDisposal: data.additionalDisposal,
      }),
      ...(data?.shouldKeepSolarThermalSystem !== undefined && {
        shouldKeepSolarThermalSystem: data.shouldKeepSolarThermalSystem,
      }),
      ...(data?.pictures && { pictures: PicturesDto.from(data.pictures) }),
    });
  }

  static create(dto: ProjectDto): ProjectDto {
    return plainToInstance(ProjectDto, dto);
  }
}
