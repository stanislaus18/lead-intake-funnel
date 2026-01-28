import { Injectable, Logger } from '@nestjs/common';
import { Observable, combineLatest, from, map, of, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { BuildingDao } from './dao';
import { BuildingRepository } from './building.repository';
import { BuildingInformation } from '../building-information/model';
import { CreateBuildingDto } from './dto';
import { Address } from '../address/model';
import { OwnershipRelationships } from '../ownership-relationships/model';
import { EnergyRelevantInformation } from '../energy-relevant-information/model';
import { HotWater } from '../hot-water/model';
import { HotWaterService } from '../hot-water/hot-water.service';
import { EnergyRelevantInformationService } from '../energy-relevant-information/energy-relevant-information.service';
import { OwnershipRelationshipsService } from '../ownership-relationships/ownership-relationships.service';
import { BuildingInformationService } from '../building-information/building-information.service';
import { AddressService } from '../address/address.service';
import { Building } from './model';

@Injectable()
export class BuildingService {
  private readonly logger = new Logger(BuildingService.name);

  constructor(
    private readonly buildingRepository: BuildingRepository,
    private readonly addressService: AddressService,
    private readonly buildingInformationService: BuildingInformationService,
    private readonly ownershipRelationshipsService: OwnershipRelationshipsService,
    private readonly energyRelevantInformationService: EnergyRelevantInformationService,
    private readonly hotWaterService: HotWaterService,
  ) {}

  create(createBuildingDto: CreateBuildingDto): Observable<string> {
    this.logger.log(`Creating building`);

    const buildingCreationArray: Observable<string>[] = [];

    const address = Address.create(createBuildingDto.address);
    const buildingInformation = BuildingInformation.create(
      createBuildingDto.buildingInformation,
    );
    const ownershipRelationships = OwnershipRelationships.create(
      createBuildingDto.ownershipRelationships,
    );
    const energyRelevantInformation = EnergyRelevantInformation.create(
      createBuildingDto.energyRelevantInformation,
    );
    const hotWater = HotWater.create(createBuildingDto.hotWater);

    buildingCreationArray.push(
      address ? this.addressService.create(address) : of(undefined),
    );
    buildingCreationArray.push(
      this.buildingInformationService.create(buildingInformation),
    );
    buildingCreationArray.push(
      ownershipRelationships
        ? this.ownershipRelationshipsService.create(ownershipRelationships)
        : of(undefined),
    );
    buildingCreationArray.push(
      energyRelevantInformation
        ? this.energyRelevantInformationService.create(
            energyRelevantInformation,
          )
        : of(undefined),
    );

    buildingCreationArray.push(
      hotWater ? this.hotWaterService.create(hotWater) : of(undefined),
    );

    return combineLatest(buildingCreationArray).pipe(
      map((ids) => {
        return Building.create({
          id: uuidv4(),
          addressId: ids[0],
          buildingInformationId: ids[1],
          ownershipRelationshipsId: ids[2],
          energyRelevantInformationId: ids[3],
          hotWaterId: ids[4],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }),
      switchMap((buildingDao: BuildingDao) =>
        this.buildingRepository.create(buildingDao),
      ),
      map((result) => result.id),
    );
  }

  findById(id: string): Observable<BuildingDao> {
    this.logger.log(`Finding building with ID: ${id}`);

    try {
      return this.buildingRepository.findById(id);
    } catch (error) {
      this.logger.error(`Failed to find building with ID: ${id}`, error);
      return of(null);
    }
  }

  update(
    id: string,
    buildingDao: Partial<BuildingDao>,
  ): Observable<BuildingDao> {
    this.logger.log(`Updating building with ID: ${id}`);

    try {
      return this.buildingRepository.update(id, {
        ...buildingDao,
        updatedAt: new Date(),
      });
    } catch (error) {
      this.logger.error(`Failed to update building with ID: ${id}`, error);
      return of(null);
    }
  }

  delete(id: string): Observable<any> {
    this.logger.log(`Deleting building with ID: ${id}`);

    try {
      return this.buildingRepository.delete(id);
    } catch (error) {
      this.logger.error(`Failed to delete building with ID: ${id}`, error);
      return of(null);
    }
  }
}
