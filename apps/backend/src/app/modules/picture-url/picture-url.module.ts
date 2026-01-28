import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PictureUrlDao, PictureUrlSchema } from './dao';
import { PictureUrlRepository } from './picture-url.repository';
import { PictureUrlService } from './picture-url.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PictureUrlDao.name, schema: PictureUrlSchema },
    ]),
  ],
  providers: [PictureUrlRepository, PictureUrlService],
  exports: [PictureUrlRepository, PictureUrlService],
})
export class PictureUrlModule {}
