import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LeadIntakeFunnelDao, LeadIntakeFunnelSchema } from './dao';
import { LeadIntakeFunnelRepository } from './lead-intake-funnel.repository';
import { LeadIntakeFunnelService } from './lead-intake-funnel.service';
import { ContactModule } from '../contact/contact.module';
import { BuildingModule } from '../building/building.module';
import { HeatingSystemModule } from '../heating-system/heating-system.module';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LeadIntakeFunnelDao.name, schema: LeadIntakeFunnelSchema },
    ]),
    ContactModule,
    BuildingModule,
    HeatingSystemModule,
    ProjectModule,
  ],
  providers: [LeadIntakeFunnelRepository, LeadIntakeFunnelService],
  exports: [LeadIntakeFunnelRepository, LeadIntakeFunnelService],
})
export class LeadIntakeFunnelModule {}
