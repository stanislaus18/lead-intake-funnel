import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesService } from './file-upload-service';
import { AppRepository } from './app.repository';
import { LeadIntakeFunnel } from './entities/lead-intake-funnel.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://root:root@localhost:27017/lead_intake_funnel?authSource=admin',
      database: process.env.MONGO_DB,
      synchronize: true, // ⚠️ Only for dev; auto creates schema
      // useUnifiedTopology: true,
      entities: [LeadIntakeFunnel],
    }),
    TypeOrmModule.forFeature([LeadIntakeFunnel]),
  ],
  controllers: [AppController],
  providers: [AppService, FilesService, AppRepository],
})
export class AppModule {}
