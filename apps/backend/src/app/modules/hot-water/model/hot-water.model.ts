import { plainToInstance } from 'class-transformer';
import { HotWaterDao } from '../dao';

export class HotWater {
  readonly id?: string;
  readonly numberOfBathtubs?: number;
  readonly numberOfShowers?: number;
  readonly typeOfShowers?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  static create(hotWater: HotWater): HotWaterDao {
    return plainToInstance(HotWaterDao, hotWater, {
      enableImplicitConversion: true,
    });
  }

  static from(hotWater: HotWaterDao): HotWater {
    return {
      id: hotWater.id,
      numberOfBathtubs: hotWater.numberOfBathtubs,
      numberOfShowers: hotWater.numberOfShowers,
      typeOfShowers: hotWater.typeOfShowers,
      createdAt: hotWater.createdAt,
      updatedAt: hotWater.updatedAt,
    };
  }
}
