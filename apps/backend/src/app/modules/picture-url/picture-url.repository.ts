import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, of } from 'rxjs';

import { PictureUrlDao } from './dao';

@Injectable()
export class PictureUrlRepository {
  private readonly logger = new Logger(PictureUrlRepository.name);

  constructor(
    @InjectModel(PictureUrlDao.name)
    private readonly pictureUrlModel: Model<PictureUrlDao>,
  ) {}

  create(pictureUrlDao: PictureUrlDao): Observable<PictureUrlDao> {
    this.logger.log(`Creating pictureUrl with ID: ${pictureUrlDao.id}`);

    try {
      return from(
        this.pictureUrlModel.create({
          ...pictureUrlDao,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      );
    } catch (error) {
      this.logger.error(
        `Failed to create pictureUrl with ID: ${pictureUrlDao.id}`,
        error,
      );
      return of(null);
    }
  }

  findById(id: string): Observable<PictureUrlDao> {
    this.logger.log(`Finding pictureUrl with ID: ${id}`);

    try {
      return from(this.pictureUrlModel.findOne({ id }));
    } catch (error) {
      this.logger.error(`Failed to find pictureUrl with ID: ${id}`, error);
      return of(null);
    }
  }

  update(
    id: string,
    pictureUrlDao: Partial<PictureUrlDao>,
  ): Observable<PictureUrlDao> {
    this.logger.log(`Updating pictureUrl with ID: ${id}`);

    try {
      return from(
        this.pictureUrlModel.findOneAndUpdate(
          { id },
          { ...pictureUrlDao, updatedAt: new Date() },
          { new: true },
        ),
      );
    } catch (error) {
      this.logger.error(`Failed to update pictureUrl with ID: ${id}`, error);
      return of(null);
    }
  }

  delete(id: string): Observable<any> {
    this.logger.log(`Deleting pictureUrl with ID: ${id}`);

    try {
      return from(this.pictureUrlModel.deleteOne({ id }));
    } catch (error) {
      this.logger.error(`Failed to delete pictureUrl with ID: ${id}`, error);
      return of(null);
    }
  }
}
