import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeatingSystemDao, HeatingSystemSchema } from './dao';
import { HeatingSystemRepository } from './heating-system.repository';
import { HeatingSystemService } from './heating-system.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HeatingSystemDao.name, schema: HeatingSystemSchema },
    ]),
  ],
  providers: [HeatingSystemRepository, HeatingSystemService],
  exports: [HeatingSystemRepository, HeatingSystemService],
})
export class HeatingSystemModule {}
