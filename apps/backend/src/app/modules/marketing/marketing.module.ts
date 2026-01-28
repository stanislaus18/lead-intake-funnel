import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketingDao, MarketingSchema } from './dao';
import { MarketingRepository } from './marketing.repository';
import { MarketingService } from './marketing.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MarketingDao.name, schema: MarketingSchema },
    ]),
  ],
  providers: [MarketingRepository, MarketingService],
  exports: [MarketingRepository, MarketingService],
})
export class MarketingModule {}
