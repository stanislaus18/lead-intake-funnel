import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, map, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { HotWaterDao } from './dao';
import { HotWaterRepository } from './hot-water.repository';

@Injectable()
export class HotWaterService {
  private readonly logger = new Logger(HotWaterService.name);

  constructor(private readonly hotWaterRepository: HotWaterRepository) {}

  create(hotWaterDao: HotWaterDao): Observable<string> {
    this.logger.log(`Creating hotWater with ID: ${hotWaterDao.id}`);

    try {
      return from(
        this.hotWaterRepository.create({
          ...hotWaterDao,
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      ).pipe(map((result) => result.id));
    } catch (error) {
      this.logger.error(
        `Failed to create hotWater with ID: ${hotWaterDao.id}`,
        error,
      );
      return of(null);
    }
  }

  findById(id: string): Observable<HotWaterDao> {
    this.logger.log(`Finding hotWater with ID: ${id}`);

    try {
      return this.hotWaterRepository.findById(id);
    } catch (error) {
      this.logger.error(`Failed to find hotWater with ID: ${id}`, error);
      return of(null);
    }
  }

  update(
    id: string,
    hotWaterDao: Partial<HotWaterDao>,
  ): Observable<HotWaterDao> {
    this.logger.log(`Updating hotWater with ID: ${id}`);

    try {
      return this.hotWaterRepository.update(id, {
        ...hotWaterDao,
        updatedAt: new Date(),
      });
    } catch (error) {
      this.logger.error(`Failed to update hotWater with ID: ${id}`, error);
      return of(null);
    }
  }

  delete(id: string): Observable<any> {
    this.logger.log(`Deleting hotWater with ID: ${id}`);

    try {
      return this.hotWaterRepository.delete(id);
    } catch (error) {
      this.logger.error(`Failed to delete hotWater with ID: ${id}`, error);
      return of(null);
    }
  }
}
