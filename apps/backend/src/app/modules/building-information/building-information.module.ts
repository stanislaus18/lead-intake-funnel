import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildingInformationDao, BuildingInformationSchema } from './dao';
import { BuildingInformationRepository } from './building-information.repository';
import { BuildingInformationService } from './building-information.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BuildingInformationDao.name, schema: BuildingInformationSchema },
    ]),
  ],
  providers: [BuildingInformationRepository, BuildingInformationService],
  exports: [BuildingInformationRepository, BuildingInformationService],
})
export class BuildingInformationModule {}
