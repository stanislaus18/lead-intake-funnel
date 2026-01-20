import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { IsString } from 'class-validator';
import { LeadStageEnum } from '../types/enums';

export class LeadResponseDto {
  @ApiProperty({
    description: 'Lead stage',
    enum: LeadStageEnum,
  })
  @IsString()
  readonly leadStage: string;

  @ApiProperty({ description: 'Data acquistion link' })
  @IsString()
  readonly dataAcquisitionLink: string;

  @ApiProperty({ description: 'Appointment booking link' })
  @IsString()
  readonly appointmentBookingLink: string;

  static from(data: LeadResponseDto): LeadResponseDto {
    return this.create({
      ...(data?.leadStage && { leadStage: data.leadStage }),
      ...(data?.dataAcquisitionLink && {
        dataAcquisitionLink: data.dataAcquisitionLink,
      }),
      ...(data?.appointmentBookingLink && {
        appointmentBookingLink: data.appointmentBookingLink,
      }),
    });
  }

  static create(dto: LeadResponseDto): LeadResponseDto {
    return plainToInstance(LeadResponseDto, dto);
  }
}
