import { Injectable } from '@nestjs/common';
import { LeadIntakeFunnelDto } from './dto/lead-intake-funnel.dto';
import { LeadStageEnum } from './types/enums';

@Injectable()
export class AppService {
  validateLead(lead: LeadIntakeFunnelDto): {
    leadStage: LeadStageEnum;
    dataAcquisitionLink: string;
    appointmentBookingLink: string;
  } | null {
    const { firstName, lastName, email, phone } =
      lead.contact.contactInformation;

    // lets default to qualification stage
    let response = null;

    if (firstName && lastName && email && phone) {
      response = {
        leadStage: LeadStageEnum.QUALIFICATION,
        dataAcquisitionLink: 'https://www.vamo-energy.com/rechner...',
        appointmentBookingLink: null,
      };

      const {
        residentialUnits,
        boilerRoomSize,
        installationLocationCeilingHeight,
        widthPathway,
        heightPathway,
      } = lead.building?.buildingInformation || {};

      const { typeOfHeating, locationHeating } =
        lead.building?.energyRelevantInformation || {};

      const { consumption, consumptionUnit, systemType } = lead.heatingSystem || {};

      const { timeline, fullReplacementOfHeatingSystemPlanned } = lead.project || {};

      if (
        residentialUnits > 0 &&
        boilerRoomSize &&
        installationLocationCeilingHeight &&
        widthPathway &&
        heightPathway
      ) {
        response = {
          leadStage: LeadStageEnum.QUALIFICATION,
          dataAcquisitionLink: 'https://www.vamo-energy.com/rechner...',
          appointmentBookingLink: null,
        };
      }
    }

    return response;
  }
}
