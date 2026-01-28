import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, of } from 'rxjs';

import { OwnershipRelationshipsDao } from './dao';

@Injectable()
export class OwnershipRelationshipsRepository {
  private readonly logger = new Logger(OwnershipRelationshipsRepository.name);

  constructor(
    @InjectModel(OwnershipRelationshipsDao.name)
    private readonly ownershipRelationshipsModel: Model<OwnershipRelationshipsDao>,
  ) {}

  create(
    ownershipRelationshipsDao: OwnershipRelationshipsDao,
  ): Observable<OwnershipRelationshipsDao> {
    this.logger.log(
      `Creating ownershipRelationships with ID: ${ownershipRelationshipsDao.id}`,
    );

    try {
      return from(
        this.ownershipRelationshipsModel.create({
          ...ownershipRelationshipsDao,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      );
    } catch (error) {
      this.logger.error(
        `Failed to create ownershipRelationships with ID: ${ownershipRelationshipsDao.id}`,
        error,
      );
      return of(null);
    }
  }

  findById(id: string): Observable<OwnershipRelationshipsDao> {
    this.logger.log(`Finding ownershipRelationships with ID: ${id}`);

    try {
      return from(this.ownershipRelationshipsModel.findOne({ id }));
    } catch (error) {
      this.logger.error(
        `Failed to find ownershipRelationships with ID: ${id}`,
        error,
      );
      return of(null);
    }
  }

  update(
    id: string,
    ownershipRelationshipsDao: Partial<OwnershipRelationshipsDao>,
  ): Observable<OwnershipRelationshipsDao> {
    this.logger.log(`Updating ownershipRelationships with ID: ${id}`);

    try {
      return from(
        this.ownershipRelationshipsModel.findOneAndUpdate(
          { id },
          { ...ownershipRelationshipsDao, updatedAt: new Date() },
          { new: true },
        ),
      );
    } catch (error) {
      this.logger.error(
        `Failed to update ownershipRelationships with ID: ${id}`,
        error,
      );
      return of(null);
    }
  }

  delete(id: string): Observable<any> {
    this.logger.log(`Deleting ownershipRelationships with ID: ${id}`);

    try {
      return from(this.ownershipRelationshipsModel.deleteOne({ id }));
    } catch (error) {
      this.logger.error(
        `Failed to delete ownershipRelationships with ID: ${id}`,
        error,
      );
      return of(null);
    }
  }
}
