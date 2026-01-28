import { plainToInstance } from 'class-transformer';
import { BuildingInformationDao } from '../dao';

export class BuildingInformation {
  readonly id?: string;
  readonly immoType?: string;
  readonly heritageProtection?: string;
  readonly constructionYear?: number;
  readonly livingSpace?: number;
  readonly constructionYearString?: string;
  readonly residentialUnits?: number;
  readonly boilerRoomSize?: string;
  readonly installationLocationCeilingHeight?: string;
  readonly widthPathway?: string;
  readonly heightPathway?: string;
  readonly roomsBetweenHeatingRoomAndOutdoorUnit?: string;
  readonly meterClosetLocation?: string;
  readonly electricityConnectionLocation?: string;
  readonly groundingType?: string;
  readonly hasSolarThermalSystem?: boolean;
  readonly personsHousehold?: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  static create(
    buildingInformation: BuildingInformation,
  ): BuildingInformationDao {
    return plainToInstance(BuildingInformationDao, buildingInformation, {
      enableImplicitConversion: true,
    });
  }

  static from(
    buildingInformation: BuildingInformationDao,
  ): BuildingInformation {
    return {
      id: buildingInformation.id,
      immoType: buildingInformation.immoType,
      heritageProtection: buildingInformation.heritageProtection,
      constructionYear: buildingInformation.constructionYear,
      livingSpace: buildingInformation.livingSpace,
      constructionYearString: buildingInformation.constructionYearString,
      residentialUnits: buildingInformation.residentialUnits,
      boilerRoomSize: buildingInformation.boilerRoomSize,
      installationLocationCeilingHeight:
        buildingInformation.installationLocationCeilingHeight,
      widthPathway: buildingInformation.widthPathway,
      heightPathway: buildingInformation.heightPathway,
      roomsBetweenHeatingRoomAndOutdoorUnit:
        buildingInformation.roomsBetweenHeatingRoomAndOutdoorUnit,
      meterClosetLocation: buildingInformation.meterClosetLocation,
      electricityConnectionLocation:
        buildingInformation.electricityConnectionLocation,
      groundingType: buildingInformation.groundingType,
      hasSolarThermalSystem: buildingInformation.hasSolarThermalSystem,
      personsHousehold: buildingInformation.personsHousehold,
      createdAt: buildingInformation.createdAt,
      updatedAt: buildingInformation.updatedAt,
    };
  }
}
