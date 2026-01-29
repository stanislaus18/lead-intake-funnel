import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, of } from 'rxjs';

import { HotWaterDao } from './dao';

@Injectable()
export class HotWaterRepository {
  private readonly logger = new Logger(HotWaterRepository.name);

  constructor(
    @InjectModel(HotWaterDao.name)
    private readonly hotWaterModel: Model<HotWaterDao>,
  ) {}

  create(hotWaterDao: HotWaterDao): Observable<HotWaterDao> {
    this.logger.log(`Creating hotWater with ID: ${hotWaterDao.id}`);

    try {
      return from(
        this.hotWaterModel.create({
          ...hotWaterDao,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      );
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
      return from(
        this.hotWaterModel.findOne(
          { id },
          { _id: 0, createdAt: 0, updatedAt: 0, id: 0 },
        ),
      );
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
      return from(
        this.hotWaterModel.findOneAndUpdate(
          { id },
          { ...hotWaterDao, updatedAt: new Date() },
          { new: true },
        ),
      );
    } catch (error) {
      this.logger.error(`Failed to update hotWater with ID: ${id}`, error);
      return of(null);
    }
  }

  delete(id: string): Observable<any> {
    this.logger.log(`Deleting hotWater with ID: ${id}`);

    try {
      return from(this.hotWaterModel.deleteOne({ id }));
    } catch (error) {
      this.logger.error(`Failed to delete hotWater with ID: ${id}`, error);
      return of(null);
    }
  }
}
