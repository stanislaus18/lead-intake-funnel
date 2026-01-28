import { plainToInstance } from 'class-transformer';
import { EnergyRelevantInformationDao } from '../dao';

export class EnergyRelevantInformation {
  readonly id?: string;
  readonly heatedArea?: number;
  readonly heatedAreaString?: string;
  readonly typeOfHeating?: string;
  readonly locationHeating?: string;
  readonly apartmentHeatingSystem?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  static create(
    energyRelevantInformation: EnergyRelevantInformation,
  ): EnergyRelevantInformationDao {
    return plainToInstance(
      EnergyRelevantInformationDao,
      energyRelevantInformation,
      {
        enableImplicitConversion: true,
      },
    );
  }

  static from(
    energyRelevantInformation: EnergyRelevantInformationDao,
  ): EnergyRelevantInformation {
    return {
      id: energyRelevantInformation.id,
      heatedArea: energyRelevantInformation.heatedArea,
      heatedAreaString: energyRelevantInformation.heatedAreaString,
      typeOfHeating: energyRelevantInformation.typeOfHeating,
      locationHeating: energyRelevantInformation.locationHeating,
      apartmentHeatingSystem: energyRelevantInformation.apartmentHeatingSystem,
      createdAt: energyRelevantInformation.createdAt,
      updatedAt: energyRelevantInformation.updatedAt,
    };
  }
}
