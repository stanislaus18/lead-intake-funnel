import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PicturesDao, PicturesSchema } from './dao';
import { PicturesRepository } from './pictures.repository';
import { PicturesService } from './pictures.service';
import { PictureUrlModule } from '../picture-url/picture-url.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PicturesDao.name, schema: PicturesSchema },
    ]),
    PictureUrlModule,
  ],
  providers: [PicturesRepository, PicturesService],
  exports: [PicturesRepository, PicturesService],
})
export class PicturesModule {}
