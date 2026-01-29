import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, map, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { PictureUrlDao } from './dao';
import { PictureUrlRepository } from './picture-url.repository';
import { PictureUrl } from './model';

@Injectable()
export class PictureUrlService {
  private readonly logger = new Logger(PictureUrlService.name);

  constructor(private readonly pictureUrlRepository: PictureUrlRepository) {}

  create(pictureUrlDao: PictureUrlDao): Observable<PictureUrl> {
    this.logger.log(`Creating picture URL with URL: ${pictureUrlDao.url}`);

    try {
      return from(
        this.pictureUrlRepository.create({
          id: pictureUrlDao.id,
          url: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      );
    } catch (error) {
      this.logger.error(
        `Failed to create picture URL with URL: ${pictureUrlDao.url}`,
        error,
      );
      return of(null);
    }
  }

  findById(id: string): Observable<PictureUrlDao> {
    this.logger.log(`Finding picture URL with ID: ${id}`);

    try {
      return this.pictureUrlRepository.findById(id);
    } catch (error) {
      this.logger.error(`Failed to find picture URL with ID: ${id}`, error);
      return of(null);
    }
  }

  update(id: string, urlPath: string): Observable<PictureUrlDao> {
    this.logger.log(`Updating picture URL with ID: ${id}`);

    try {
      return this.pictureUrlRepository.update(id, {
        url: urlPath,
        updatedAt: new Date(),
      });
    } catch (error) {
      this.logger.error(`Failed to update picture URL with ID: ${id}`, error);
      return of(null);
    }
  }

  delete(id: string): Observable<any> {
    this.logger.log(`Deleting picture URL with ID: ${id}`);

    try {
      return this.pictureUrlRepository.delete(id);
    } catch (error) {
      this.logger.error(`Failed to delete picture URL with ID: ${id}`, error);
      return of(null);
    }
  }
}
