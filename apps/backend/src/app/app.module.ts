import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.MONGO_HOST || 'localhost',
      port: parseInt(process.env.MONGO_PORT) || 27017,
      database: process.env.MONGO_DB || 'mydb',
      username: process.env.MONGO_USER || 'root',
      password: process.env.MONGO_PASS || 'example',
      synchronize: true, // ⚠️ Only for dev; auto creates schema
      // useUnifiedTopology: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
