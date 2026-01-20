import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MarketingDto } from './dto/marketing.dto';
import { AddressDto } from './dto/address.dto';
import { ContactInformationDto } from './dto/contact-information.dto';
import { ContactDto } from './dto/contact.dto';
import { LeadIntakeFunnelDto } from './dto/lead-intake-funnel.dto';
import { ApiExtraModels, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LeadResponseDto } from './dto/lead-response.dto';

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
  constructor(private readonly appService: AppService) {}

  @Post()
  @ApiOkResponse({ type: LeadResponseDto })
  postLeadData(@Body() leadIntakeFunnelDto: LeadIntakeFunnelDto): LeadResponseDto {
    console.log('leadIntakeFunnelDto', leadIntakeFunnelDto);

    const response = this.appService.validateLead(leadIntakeFunnelDto);
    console.log('Response from service:', response);
    return LeadResponseDto.create(response);
  }
}
