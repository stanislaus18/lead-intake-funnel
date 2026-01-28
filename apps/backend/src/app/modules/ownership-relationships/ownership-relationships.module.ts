import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnershipRelationshipsDao, OwnershipRelationshipsSchema } from './dao';
import { OwnershipRelationshipsRepository } from './ownership-relationships.repository';
import { OwnershipRelationshipsService } from './ownership-relationships.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OwnershipRelationshipsDao.name,
        schema: OwnershipRelationshipsSchema,
      },
    ]),
  ],
  providers: [OwnershipRelationshipsRepository, OwnershipRelationshipsService],
  exports: [OwnershipRelationshipsRepository, OwnershipRelationshipsService],
})
export class OwnershipRelationshipsModule {}
