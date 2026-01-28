import {
  Body,
  Controller,
  HttpException,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExtraModels, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LeadResponseDto } from './dto/lead-response.dto';
import { FilesService } from './file-upload-service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as Express from 'express';
import { CreateLeadIntakeFunnelDto } from './modules/lead-intake-funnel/dto';
import { Observable } from 'rxjs';
import { BuildingDto } from './modules/building/dto';
import { ContactDto } from './modules/contact/dto';
import { AddressDto } from './modules/address/dto';
import { ContactInformationDto } from './modules/contact-information/dto';
import { MarketingDto } from './modules/marketing/dto';
import { BuildingInformationDto } from './modules/building-information/dto';
import { OwnershipRelationshipsDto } from './modules/ownership-relationships/dto';
import { EnergyRelevantInformationDto } from './modules/energy-relevant-information/dto';
import { HotWaterDto } from './modules/hot-water/dto';

@ApiExtraModels(
  LeadResponseDto,
  BuildingDto,
  ContactDto,
  AddressDto,
  ContactInformationDto,
  MarketingDto,
  BuildingInformationDto,
  OwnershipRelationshipsDto,
  EnergyRelevantInformationDto,
  HotWaterDto,
)
@ApiTags('LeadIntakeFunnel')
@Controller('lead-intake-funnel')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly filesService: FilesService,
  ) {}

  @Post()
  @ApiOkResponse({ type: LeadResponseDto })
  postLeadData(
    @Body() createLeadIntakeFunnelDto: CreateLeadIntakeFunnelDto,
  ): Observable<LeadResponseDto> {
    console.log('leadIntakeFunnelDto', createLeadIntakeFunnelDto);

    try {
      return this.appService.validateLead(createLeadIntakeFunnelDto);
    } catch {
      throw new HttpException('Lead validation failed', 424);
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { id: string },
  ): Promise<any> {
    console.log('Received file name:', file.originalname);
    console.log('Received file id:', body.id);

    const result = await this.filesService.uploadFile(file, body.id);
    return { message: 'File uploaded successfully', id: body.id };
  }
}
