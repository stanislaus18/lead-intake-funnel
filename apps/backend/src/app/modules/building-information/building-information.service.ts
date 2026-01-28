import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, map, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { BuildingInformationDao } from './dao';
import { BuildingInformationRepository } from './building-information.repository';

@Injectable()
export class BuildingInformationService {
  private readonly logger = new Logger(BuildingInformationService.name);

  constructor(
    private readonly buildingInformationRepository: BuildingInformationRepository,
  ) {}

  create(buildingInformationDao: BuildingInformationDao): Observable<string> {
    this.logger.log(
      `Creating buildingInformation with ID: ${buildingInformationDao.id}`,
    );

    try {
      return from(
        this.buildingInformationRepository.create({
          ...buildingInformationDao,
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      ).pipe(map((result) => result.id));
    } catch (error) {
      this.logger.error(
        `Failed to create buildingInformation with ID: ${buildingInformationDao.id}`,
        error,
      );
      return of(null);
    }
  }

  findById(id: string): Observable<BuildingInformationDao> {
    this.logger.log(`Finding buildingInformation with ID: ${id}`);

    try {
      return this.buildingInformationRepository.findById(id);
    } catch (error) {
      this.logger.error(
        `Failed to find buildingInformation with ID: ${id}`,
        error,
      );
      return of(null);
    }
  }

  update(
    id: string,
    buildingInformationDao: Partial<BuildingInformationDao>,
  ): Observable<BuildingInformationDao> {
    this.logger.log(`Updating buildingInformation with ID: ${id}`);

    try {
      return this.buildingInformationRepository.update(id, {
        ...buildingInformationDao,
        updatedAt: new Date(),
      });
    } catch (error) {
      this.logger.error(
        `Failed to update buildingInformation with ID: ${id}`,
        error,
      );
      return of(null);
    }
  }

  delete(id: string): Observable<any> {
    this.logger.log(`Deleting buildingInformation with ID: ${id}`);

    try {
      return this.buildingInformationRepository.delete(id);
    } catch (error) {
      this.logger.error(
        `Failed to delete buildingInformation with ID: ${id}`,
        error,
      );
      return of(null);
    }
  }
}
