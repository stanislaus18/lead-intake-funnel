import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildingDao, BuildingSchema } from './dao';
import { BuildingRepository } from './building.repository';
import { BuildingService } from './building.service';
import { BuildingInformationModule } from '../building-information/building-information.module';
import { AddressModule } from '../address/address.module';
import { OwnershipRelationshipsModule } from '../ownership-relationships/ownership-relationships.module';
import { EnergyRelevantInformationModule } from '../energy-relevant-information/energy-relevant-information.module';
import { HotWaterModule } from '../hot-water/hot-water.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BuildingDao.name, schema: BuildingSchema },
    ]),
    BuildingInformationModule,
    AddressModule,
    OwnershipRelationshipsModule,
    EnergyRelevantInformationModule,
    HotWaterModule,
  ],
  providers: [BuildingRepository, BuildingService],
  exports: [BuildingRepository, BuildingService],
})
export class BuildingModule {}
