import { plainToInstance } from 'class-transformer';
import { PictureUrlDao } from '../dao';

export class PictureUrl {
  readonly id: string;
  readonly url: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  static create(pictureUrl: PictureUrl): PictureUrl {
    return plainToInstance(PictureUrl, pictureUrl, {
      enableImplicitConversion: true,
    });
  }

  static from(pictureUrl: PictureUrlDao): PictureUrl {
    return this.create({
      id: pictureUrl.id,
      url: pictureUrl.url,
      createdAt: pictureUrl.createdAt,
      updatedAt: pictureUrl.updatedAt,
    });
  }
}
