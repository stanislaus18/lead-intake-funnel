import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, map, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { EnergyRelevantInformationDao } from './dao';
import { EnergyRelevantInformationRepository } from './energy-relevant-information.repository';

@Injectable()
export class EnergyRelevantInformationService {
  private readonly logger = new Logger(EnergyRelevantInformationService.name);

  constructor(
    private readonly energyRelevantInformationRepository: EnergyRelevantInformationRepository,
  ) {}

  create(
    energyRelevantInformationDao: EnergyRelevantInformationDao,
  ): Observable<string> {
    this.logger.log(
      `Creating energyRelevantInformation with ID: ${energyRelevantInformationDao.id}`,
    );

    try {
      return from(
        this.energyRelevantInformationRepository.create({
          ...energyRelevantInformationDao,
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      ).pipe(map((result) => result.id));
    } catch (error) {
      this.logger.error(
        `Failed to create energyRelevantInformation with ID: ${energyRelevantInformationDao.id}`,
        error,
      );
      return of(null);
    }
  }

  findById(id: string): Observable<EnergyRelevantInformationDao> {
    this.logger.log(`Finding energyRelevantInformation with ID: ${id}`);

    try {
      return this.energyRelevantInformationRepository.findById(id);
    } catch (error) {
      this.logger.error(
        `Failed to find energyRelevantInformation with ID: ${id}`,
        error,
      );
      return of(null);
    }
  }

  update(
    id: string,
    energyRelevantInformationDao: Partial<EnergyRelevantInformationDao>,
  ): Observable<EnergyRelevantInformationDao> {
    this.logger.log(`Updating energyRelevantInformation with ID: ${id}`);

    try {
      return this.energyRelevantInformationRepository.update(id, {
        ...energyRelevantInformationDao,
        updatedAt: new Date(),
      });
    } catch (error) {
      this.logger.error(
        `Failed to update energyRelevantInformation with ID: ${id}`,
        error,
      );
      return of(null);
    }
  }

  delete(id: string): Observable<any> {
    this.logger.log(`Deleting energyRelevantInformation with ID: ${id}`);

    try {
      return this.energyRelevantInformationRepository.delete(id);
    } catch (error) {
      this.logger.error(
        `Failed to delete energyRelevantInformation with ID: ${id}`,
        error,
      );
      return of(null);
    }
  }
}
