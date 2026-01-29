import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, of } from 'rxjs';

import { EnergyRelevantInformationDao } from './dao';

@Injectable()
export class EnergyRelevantInformationRepository {
  private readonly logger = new Logger(
    EnergyRelevantInformationRepository.name,
  );

  constructor(
    @InjectModel(EnergyRelevantInformationDao.name)
    private readonly energyRelevantInformationModel: Model<EnergyRelevantInformationDao>,
  ) {}

  create(
    energyRelevantInformationDao: EnergyRelevantInformationDao,
  ): Observable<EnergyRelevantInformationDao> {
    this.logger.log(
      `Creating energyRelevantInformation with ID: ${energyRelevantInformationDao.id}`,
    );

    try {
      return from(
        this.energyRelevantInformationModel.create({
          ...energyRelevantInformationDao,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      );
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
      return from(
        this.energyRelevantInformationModel.findOne(
          { id },
          { _id: 0, createdAt: 0, updatedAt: 0, id: 0 },
        ),
      );
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
      return from(
        this.energyRelevantInformationModel.findOneAndUpdate(
          { id },
          { ...energyRelevantInformationDao, updatedAt: new Date() },
          { new: true },
        ),
      );
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
      return from(this.energyRelevantInformationModel.deleteOne({ id }));
    } catch (error) {
      this.logger.error(
        `Failed to delete energyRelevantInformation with ID: ${id}`,
        error,
      );
      return of(null);
    }
  }
}
