import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, of } from 'rxjs';

import { PicturesDao } from './dao';

@Injectable()
export class PicturesRepository {
  private readonly logger = new Logger(PicturesRepository.name);

  constructor(
    @InjectModel(PicturesDao.name)
    private readonly picturesModel: Model<PicturesDao>,
  ) {}

  create(picturesDao: PicturesDao): Observable<PicturesDao> {
    this.logger.log(`Creating pictures with ID: ${picturesDao.id}`);

    try {
      return from(
        this.picturesModel.create({
          ...picturesDao,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      );
    } catch (error) {
      this.logger.error(
        `Failed to create pictures with ID: ${picturesDao.id}`,
        error,
      );
      return of(null);
    }
  }

  findById(id: string): Observable<PicturesDao> {
    this.logger.log(`Finding pictures with ID: ${id}`);

    try {
      return from(this.picturesModel.findOne({ id }));
    } catch (error) {
      this.logger.error(`Failed to find pictures with ID: ${id}`, error);
      return of(null);
    }
  }

  update(
    id: string,
    picturesDao: Partial<PicturesDao>,
  ): Observable<PicturesDao> {
    this.logger.log(`Updating pictures with ID: ${id}`);

    try {
      return from(
        this.picturesModel.findOneAndUpdate(
          { id },
          { ...picturesDao, updatedAt: new Date() },
          { new: true },
        ),
      );
    } catch (error) {
      this.logger.error(`Failed to update pictures with ID: ${id}`, error);
      return of(null);
    }
  }

  delete(id: string): Observable<any> {
    this.logger.log(`Deleting pictures with ID: ${id}`);

    try {
      return from(this.picturesModel.deleteOne({ id }));
    } catch (error) {
      this.logger.error(`Failed to delete pictures with ID: ${id}`, error);
      return of(null);
    }
  }
}
