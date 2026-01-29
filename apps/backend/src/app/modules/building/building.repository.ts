import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, of } from 'rxjs';

import { BuildingDao } from './dao';

@Injectable()
export class BuildingRepository {
  private readonly logger = new Logger(BuildingRepository.name);

  constructor(
    @InjectModel(BuildingDao.name)
    private readonly buildingModel: Model<BuildingDao>,
  ) {}

  create(buildingDao: BuildingDao): Observable<BuildingDao> {
    this.logger.log(`Creating building with ID: ${buildingDao.id}`);

    try {
      return from(
        this.buildingModel.create({
          ...buildingDao,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      );
    } catch (error) {
      this.logger.error(
        `Failed to create building with ID: ${buildingDao.id}`,
        error,
      );
      return of(null);
    }
  }

  findById(id: string): Observable<BuildingDao> {
    this.logger.log(`Finding building with ID: ${id}`);

    try {
      return from(
        this.buildingModel.findOne(
          { id },
          { _id: 0, createdAt: 0, updatedAt: 0, id: 0 },
        ),
      );
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
      return from(
        this.buildingModel.findOneAndUpdate(
          { id },
          { ...buildingDao, updatedAt: new Date() },
          { new: true },
        ),
      );
    } catch (error) {
      this.logger.error(`Failed to update building with ID: ${id}`, error);
      return of(null);
    }
  }

  delete(id: string): Observable<any> {
    this.logger.log(`Deleting building with ID: ${id}`);

    try {
      return from(this.buildingModel.deleteOne({ id }));
    } catch (error) {
      this.logger.error(`Failed to delete building with ID: ${id}`, error);
      return of(null);
    }
  }
}
