import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance, Type } from 'class-transformer';
import { IsOptional, IsString, IsDate, ValidateNested, IsNotEmpty } from 'class-validator';
import { ContactDto } from './contact.dto';
import { BuildingDto } from './building.dto';
import { HeatingSystemDto } from './heating-system.dto';
import { ProjectDto } from './project.dto';

export class LeadIntakeFunnelDto {
  @ApiProperty({ description: 'Version of the lead intake funnel' })
  @IsOptional()
  @IsString()
  readonly version: string;

  @ApiProperty({
    type: ContactDto,
    description: 'Associated Contact',
  })
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => ContactDto)
  readonly contact: ContactDto;

  @ApiProperty({ description: 'Associated building' })
  @IsOptional()
  @Type(() => BuildingDto)
  readonly building: BuildingDto;

  @ApiProperty({ description: 'Associated heating system' })
  @IsOptional()
  @Type(() => HeatingSystemDto)
  readonly heatingSystem: HeatingSystemDto;

  @ApiProperty({ description: 'Associated project' })
  @IsOptional()
  @Type(() => ProjectDto)
  readonly project: ProjectDto;

  @ApiProperty({ description: 'Date when record was created' })
  @IsOptional()
  @IsDate()
  readonly createdAt: Date;

  @ApiProperty({ description: 'Date when record was last updated' })
  @IsOptional()
  @IsDate()
  readonly updatedAt: Date;

  static from(data: LeadIntakeFunnelDto): LeadIntakeFunnelDto {
    return this.create({
      ...(data?.version && { version: data.version }),
      ...(data?.contact && { contact: data.contact }),
      ...(data?.building && { building: data.building }),
      ...(data?.heatingSystem && { heatingSystem: data.heatingSystem }),
      ...(data?.project && { project: data.project }),
      ...(data?.createdAt && { createdAt: data.createdAt }),
      ...(data?.updatedAt && { updatedAt: data.updatedAt }),
    });
  }

  static create(dto: LeadIntakeFunnelDto): LeadIntakeFunnelDto {
    return plainToInstance(LeadIntakeFunnelDto, dto);
  }
}
