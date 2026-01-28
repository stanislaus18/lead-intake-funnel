import { plainToInstance } from 'class-transformer';
import { BuildingDao } from '../dao';

export class Building {
  readonly id: string;
  readonly addressId: string;
  readonly buildingInformationId: string;
  readonly ownershipRelationshipsId: string;
  readonly energyRelevantInformationId: string;
  readonly hotWaterId: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  static create(building: Building): BuildingDao {
    return plainToInstance(BuildingDao, building, {
      enableImplicitConversion: true,
    });
  }

  static from(building: BuildingDao): Building {
    return {
      id: building.id,
      addressId: building.addressId,
      buildingInformationId: building.buildingInformationId,
      ownershipRelationshipsId: building.ownershipRelationshipsId,
      energyRelevantInformationId: building.energyRelevantInformationId,
      hotWaterId: building.hotWaterId,
      createdAt: building.createdAt,
      updatedAt: building.updatedAt,
    };
  }
}
