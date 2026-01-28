import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotWaterDao, HotWaterSchema } from './dao';
import { HotWaterRepository } from './hot-water.repository';
import { HotWaterService } from './hot-water.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HotWaterDao.name, schema: HotWaterSchema },
    ]),
  ],
  providers: [HotWaterRepository, HotWaterService],
  exports: [HotWaterRepository, HotWaterService],
})
export class HotWaterModule {}
