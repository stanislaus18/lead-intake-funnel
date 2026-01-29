import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, of } from 'rxjs';

import { BuildingInformationDao } from './dao';

@Injectable()
export class BuildingInformationRepository {
  private readonly logger = new Logger(BuildingInformationRepository.name);

  constructor(
    @InjectModel(BuildingInformationDao.name)
    private readonly buildingInformationModel: Model<BuildingInformationDao>,
  ) {}

  create(
    buildingInformationDao: BuildingInformationDao,
  ): Observable<BuildingInformationDao> {
    this.logger.log(
      `Creating buildingInformation with ID: ${buildingInformationDao.id}`,
    );

    try {
      return from(
        this.buildingInformationModel.create({
          ...buildingInformationDao,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      );
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
      return from(
        this.buildingInformationModel.findOne(
          { id },
          { _id: 0, createdAt: 0, updatedAt: 0, id: 0 },
        ),
      );
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
      return from(
        this.buildingInformationModel.findOneAndUpdate(
          { id },
          { ...buildingInformationDao, updatedAt: new Date() },
          { new: true },
        ),
      );
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
      return from(this.buildingInformationModel.deleteOne({ id }));
    } catch (error) {
      this.logger.error(
        `Failed to delete buildingInformation with ID: ${id}`,
        error,
      );
      return of(null);
    }
  }
}
