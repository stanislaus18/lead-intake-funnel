import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsEnum,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import {
  FoundationStatusEnum,
  HouseholdIncomeEnum,
  TimelineEnum,
  DisposalTypeEnum,
} from '../enum';
import { CreatePicturesDto } from '../../pictures/dto';
import { Type } from 'class-transformer';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Project timeline',
  })
  @IsEnum(TimelineEnum)
  @IsOptional()
  readonly timeline?: TimelineEnum;

  @ApiProperty({
    description: 'Household income',
  })
  @IsEnum(HouseholdIncomeEnum)
  @IsOptional()
  readonly householdIncome?: HouseholdIncomeEnum;

  @ApiProperty({
    description: 'Status of foundation construction',
  })
  @IsEnum(FoundationStatusEnum)
  @IsOptional()
  readonly statusOfFoundationConstruction?: FoundationStatusEnum;

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
  @ValidateNested()
  @Type(() => CreatePicturesDto)
  @IsOptional()
  readonly pictures?: CreatePicturesDto;
}
