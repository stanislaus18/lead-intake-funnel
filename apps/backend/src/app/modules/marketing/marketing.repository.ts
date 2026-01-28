import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, of } from 'rxjs';

import { MarketingDao } from './dao';

@Injectable()
export class MarketingRepository {
  private readonly logger = new Logger(MarketingRepository.name);

  constructor(
    @InjectModel(MarketingDao.name)
    private readonly marketingModel: Model<MarketingDao>,
  ) {}

  create(marketingDao: MarketingDao): Observable<MarketingDao> {
    this.logger.log(`Creating marketing with ID: ${marketingDao.id}`);

    try {
      return from(
        this.marketingModel.create({
          ...marketingDao,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      );
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
      return from(this.marketingModel.findOne({ id }));
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
      return from(
        this.marketingModel.findOneAndUpdate(
          { id },
          { ...marketingDao, updatedAt: new Date() },
          { new: true },
        ),
      );
    } catch (error) {
      this.logger.error(`Failed to update marketing with ID: ${id}`, error);
      return of(null);
    }
  }

  delete(id: string): Observable<any> {
    this.logger.log(`Deleting marketing with ID: ${id}`);

    try {
      return from(this.marketingModel.deleteOne({ id }));
    } catch (error) {
      this.logger.error(`Failed to delete marketing with ID: ${id}`, error);
      return of(null);
    }
  }
}
