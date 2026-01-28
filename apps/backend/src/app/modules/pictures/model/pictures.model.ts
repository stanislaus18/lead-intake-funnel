import { plainToInstance } from 'class-transformer';
import { PicturesDao } from '../dao';

export class Pictures {
  readonly id: string;
  readonly outdoorUnitLocationIds: string[];
  readonly outdoorUnitLocationWithAreaIds: string[];
  readonly heatingRoomIds: string[];
  readonly meterClosetWithDoorOpenIds: string[];
  readonly meterClosetSlsSwitchDetailedIds: string[];
  readonly floorHeatingDistributionWithDoorOpenIds: string[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  static create(pictures: Pictures): Pictures {
    return plainToInstance(Pictures, pictures, {
      enableImplicitConversion: true,
    });
  }

  static from(pictures: PicturesDao): Pictures {
    return this.create({
      id: pictures.id,
      outdoorUnitLocationIds: pictures.outdoorUnitLocationIds,
      outdoorUnitLocationWithAreaIds: pictures.outdoorUnitLocationWithAreaIds,
      heatingRoomIds: pictures.heatingRoomIds,
      meterClosetWithDoorOpenIds: pictures.meterClosetWithDoorOpenIds,
      meterClosetSlsSwitchDetailedIds: pictures.meterClosetSlsSwitchDetailedIds,
      floorHeatingDistributionWithDoorOpenIds:
        pictures.floorHeatingDistributionWithDoorOpenIds,
      createdAt: pictures.createdAt,
      updatedAt: pictures.updatedAt,
    });
  }
}
