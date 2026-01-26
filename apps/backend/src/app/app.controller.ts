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
import { MarketingDto } from './dto/marketing.dto';
import { AddressDto } from './dto/address.dto';
import { ContactInformationDto } from './dto/contact-information.dto';
import { ContactDto } from './dto/contact.dto';
import { LeadIntakeFunnelDto } from './dto/lead-intake-funnel.dto';
import { ApiExtraModels, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LeadResponseDto } from './dto/lead-response.dto';
import { FilesService } from './file-upload-service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as Express from 'express';

@ApiExtraModels(
  ContactDto,
  ContactInformationDto,
  AddressDto,
  MarketingDto,
  LeadIntakeFunnelDto,
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
  async postLeadData(
    @Body() leadIntakeFunnelDto: LeadIntakeFunnelDto,
  ): Promise<LeadResponseDto> {
    let response;
    console.log('leadIntakeFunnelDto', leadIntakeFunnelDto);

    try {
      response = await this.appService.validateLead(leadIntakeFunnelDto);

      console.log('Response from service:', response);
      if (!response) {
        throw new HttpException('Lead validation failed', 400);
      }
    } catch {
      throw new HttpException('Lead validation failed', 424);
    }

    return LeadResponseDto.create(response);
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
