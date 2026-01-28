import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesService } from './file-upload-service';
import { LeadIntakeFunnelModule } from './modules/lead-intake-funnel/lead-intake-funnel.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI ||
        'mongodb://root:root@localhost:27017/lead_intake_funnel?authSource=admin',
    ),
    LeadIntakeFunnelModule,
  ],
  controllers: [AppController],
  providers: [AppService, FilesService],
})
export class AppModule {}
