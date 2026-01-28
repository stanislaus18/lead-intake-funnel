import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectDao, ProjectSchema } from './dao';
import { ProjectRepository } from './project.repository';
import { ProjectService } from './project.service';
import { PicturesModule } from '../pictures/pictures.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProjectDao.name, schema: ProjectSchema },
    ]),
    PicturesModule,
  ],
  providers: [ProjectRepository, ProjectService],
  exports: [ProjectRepository, ProjectService],
})
export class ProjectModule {}
