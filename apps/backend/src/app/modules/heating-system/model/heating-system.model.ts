import { plainToInstance } from 'class-transformer';
import { HeatingSystemDao } from '../dao';

export class HeatingSystem {
  readonly id: string;
  readonly consumption: number;
  readonly consumptionUnit: string;
  readonly systemType: string;
  readonly constructionYearHeatingSystem: number;
  readonly constructionYearHeatingSystemString: string;
  readonly model: string;
  readonly floorHeatingConnectedToReturnPipe: boolean;
  readonly floorHeatingOwnHeatingCircuit: boolean;
  readonly floorHeatingOnlyInSmallRooms: boolean;
  readonly numberOfFloorHeatingDistributors: number;
  readonly numberOfRadiators: number;
  readonly domesticHotWaterByHeatpump: boolean;
  readonly domesticHotWaterCirculationPump: string;
  readonly domestic_water_station: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  static create(heatingSystem: HeatingSystem): HeatingSystemDao {
    return plainToInstance(HeatingSystemDao, heatingSystem, {
      enableImplicitConversion: true,
    });
  }

  static from(heatingSystem: HeatingSystemDao): HeatingSystem {
    return { ...heatingSystem } as HeatingSystem;
  }
}
