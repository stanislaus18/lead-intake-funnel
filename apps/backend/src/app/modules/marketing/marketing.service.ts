import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, map, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { MarketingDao } from './dao';
import { MarketingRepository } from './marketing.repository';

@Injectable()
export class MarketingService {
  private readonly logger = new Logger(MarketingService.name);

  constructor(private readonly marketingRepository: MarketingRepository) {}

  create(marketingDao: MarketingDao): Observable<string> {
    this.logger.log(`Creating marketing with ID: ${marketingDao.id}`);

    try {
      return from(
        this.marketingRepository.create({
          ...marketingDao,
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      ).pipe(map((result) => result.id));
    } catch (error) {
      this.logger.error(
        `Failed to create marketing with ID: ${marketingDao.id}`,
        error,
      );
      return of(null);
    }
  }

  findById(id: string): Observable<MarketingDao> {
    this.logger.log(`Finding marketing with ID: ${id}`);

    try {
      return this.marketingRepository.findById(id);
    } catch (error) {
      this.logger.error(`Failed to find marketing with ID: ${id}`, error);
      return of(null);
    }
  }

  update(
    id: string,
    marketingDao: Partial<MarketingDao>,
  ): Observable<MarketingDao> {
    this.logger.log(`Updating marketing with ID: ${id}`);

    try {
      return this.marketingRepository.update(id, {
        ...marketingDao,
        updatedAt: new Date(),
      });
    } catch (error) {
      this.logger.error(`Failed to update marketing with ID: ${id}`, error);
      return of(null);
    }
  }

  delete(id: string): Observable<any> {
    this.logger.log(`Deleting marketing with ID: ${id}`);

    try {
      return this.marketingRepository.delete(id);
    } catch (error) {
      this.logger.error(`Failed to delete marketing with ID: ${id}`, error);
      return of(null);
    }
  }
}
