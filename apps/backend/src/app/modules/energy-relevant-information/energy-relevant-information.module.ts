import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EnergyRelevantInformationDao,
  EnergyRelevantInformationSchema,
} from './dao';
import { EnergyRelevantInformationRepository } from './energy-relevant-information.repository';
import { EnergyRelevantInformationService } from './energy-relevant-information.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EnergyRelevantInformationDao.name,
        schema: EnergyRelevantInformationSchema,
      },
    ]),
  ],
  providers: [
    EnergyRelevantInformationRepository,
    EnergyRelevantInformationService,
  ],
  exports: [
    EnergyRelevantInformationRepository,
    EnergyRelevantInformationService,
  ],
})
export class EnergyRelevantInformationModule {}
