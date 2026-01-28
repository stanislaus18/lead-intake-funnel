import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, of } from 'rxjs';

import { HeatingSystemDao } from './dao';

@Injectable()
export class HeatingSystemRepository {
  private readonly logger = new Logger(HeatingSystemRepository.name);

  constructor(
    @InjectModel(HeatingSystemDao.name)
    private readonly heatingSystemModel: Model<HeatingSystemDao>,
  ) {}

  create(heatingSystemDao: HeatingSystemDao): Observable<HeatingSystemDao> {
    this.logger.log(`Creating heatingSystem with ID: ${heatingSystemDao.id}`);

    try {
      return from(
        this.heatingSystemModel.create({
          ...heatingSystemDao,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      );
    } catch (error) {
      this.logger.error(
        `Failed to create heatingSystem with ID: ${heatingSystemDao.id}`,
        error,
      );
      return of(null);
    }
  }

  findById(id: string): Observable<HeatingSystemDao> {
    this.logger.log(`Finding heatingSystem with ID: ${id}`);

    try {
      return from(this.heatingSystemModel.findOne({ id }));
    } catch (error) {
      this.logger.error(`Failed to find heatingSystem with ID: ${id}`, error);
      return of(null);
    }
  }

  update(
    id: string,
    heatingSystemDao: Partial<HeatingSystemDao>,
  ): Observable<HeatingSystemDao> {
    this.logger.log(`Updating heatingSystem with ID: ${id}`);

    try {
      return from(
        this.heatingSystemModel.findOneAndUpdate(
          { id },
          { ...heatingSystemDao, updatedAt: new Date() },
          { new: true },
        ),
      );
    } catch (error) {
      this.logger.error(`Failed to update heatingSystem with ID: ${id}`, error);
      return of(null);
    }
  }

  delete(id: string): Observable<any> {
    this.logger.log(`Deleting heatingSystem with ID: ${id}`);

    try {
      return from(this.heatingSystemModel.deleteOne({ id }));
    } catch (error) {
      this.logger.error(`Failed to delete heatingSystem with ID: ${id}`, error);
      return of(null);
    }
  }
}
