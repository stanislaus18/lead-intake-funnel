import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_PORT),
      database: process.env.MONGO_DB,
      username: process.env.MONGO_USER,
      password: process.env.MONGO_PASS,
      synchronize: true, // ⚠️ Only for dev; auto creates schema
      // useUnifiedTopology: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
