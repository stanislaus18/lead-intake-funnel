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
    // lets default to qualification stage
    let response = null;

    if (this.isQualified(lead)) {
      response = {
        leadStage: LeadStageEnum.QUALIFICATION,
        dataAcquisitionLink: 'https://www.vamo-energy.com/rechner...',
        appointmentBookingLink: null,
      };

      if (this.isDiscoverable(lead)) {
        response = {
          leadStage: LeadStageEnum.DISCOVERY,
          dataAcquisitionLink: 'https://www.vamo-energy.com/rechner...',
          appointmentBookingLink: 'appointmentBookingLink',
        };
      }

      if(this.isSelling(lead)) {
        response = {
          leadStage: LeadStageEnum.SELLING,
          dataAcquisitionLink: 'https://www.vamo-energy.com/rechner...',
          appointmentBookingLink: 'appointmentBookingLink',
        };
      }
    }

    return response;
  }

  isQualified(lead: LeadIntakeFunnelDto): boolean {
    const { firstName, lastName, email, phone } =
      lead.contact.contactInformation;

    if (firstName && lastName && email && phone) {
      return true;
    }
    return false;
  }

  isDiscoverable(lead: LeadIntakeFunnelDto): boolean {
    const {
      residentialUnits,
      boilerRoomSize,
      installationLocationCeilingHeight,
      widthPathway,
      heightPathway,
    } = lead.building?.buildingInformation || {};

    const { heatedAreaString, typeOfHeating } =
      lead.building?.energyRelevantInformation || {};

    const { timeline, fullReplacementOfHeatingSystemPlanned } =
      lead.project || {};

    const { consumption, consumptionUnit, systemType } =
      lead.heatingSystem || {};

    if (
      residentialUnits > 0 &&
      boilerRoomSize &&
      installationLocationCeilingHeight &&
      widthPathway &&
      heightPathway &&
      timeline &&
      fullReplacementOfHeatingSystemPlanned &&
      consumption &&
      consumptionUnit &&
      systemType &&
      heatedAreaString &&
      typeOfHeating
    ) {
      return true;
    }
    return false;
  }

  isSelling(lead: LeadIntakeFunnelDto): boolean {
    const {
      constructionYear,
      livingSpace,
      constructionYearString,
      roomsBetweenHeatingRoomAndOutdoorUnit,
      meterClosetLocation,
      electricityConnectionLocation,
      groundingType,
      hasSolarThermalSystem,
      personsHousehold,
    } = lead.building?.buildingInformation || {};

    const isBuildingInfoComplete =
      constructionYear > 0 &&
      livingSpace > 0 &&
      constructionYearString &&
      roomsBetweenHeatingRoomAndOutdoorUnit &&
      meterClosetLocation &&
      electricityConnectionLocation &&
      groundingType &&
      hasSolarThermalSystem !== undefined &&
      personsHousehold >= 0;

    if (!isBuildingInfoComplete) {
      return false;
    }

    const { ownerOccupiedHousing, type } =
      lead.building?.ownershipRelationships || {};

    const isOwnershipRelationshipsComplete =
      ownerOccupiedHousing !== undefined && type;

    if (!isOwnershipRelationshipsComplete) {
      return false;
    }

    const {
      floorHeatingConnectedToReturnPipe,
      floorHeatingOwnHeatingCircuit,
      floorHeatingOnlyInSmallRooms,
      numberOfFloorHeatingDistributors,
      numberOfRadiators,
      domesticHotWaterByHeatpump,
      domesticHotWaterCirculationPump,
      domestic_water_station,
    } = lead.heatingSystem || {};

    const isHeatingSystemComplete =
      floorHeatingConnectedToReturnPipe !== undefined &&
      floorHeatingOwnHeatingCircuit !== undefined &&
      floorHeatingOnlyInSmallRooms !== undefined &&
      numberOfFloorHeatingDistributors >= 0 &&
      numberOfRadiators >= 0 &&
      domesticHotWaterByHeatpump !== undefined &&
      domesticHotWaterCirculationPump !== undefined &&
      domestic_water_station !== undefined;

      if (!isHeatingSystemComplete) {
        return false;
      }

    const {
      householdIncome,
      statusOfFoundationConstruction,
      additionalDisposal,
      shouldKeepSolarThermalSystem,
    } = lead.project || {};

    const isProjectComplete =
      householdIncome &&
      statusOfFoundationConstruction !== undefined &&
      additionalDisposal !== undefined &&
      shouldKeepSolarThermalSystem !== undefined;

    if (!isProjectComplete) {
      return false;
    }

    // const {
    //   outdoorUnitLocation,
    //   heatingRoom,
    //   meterClosetWithDoorOpen,
    //   meterClosetSlsSwitchDetailed,
    //   floorHeatingDistributionWithDoorOpen,
    // } = lead.project.pictures || {};

    // TODO implement selling logic
    return true;
  }
}
