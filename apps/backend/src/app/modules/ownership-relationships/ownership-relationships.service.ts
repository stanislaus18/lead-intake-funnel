import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, map, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { OwnershipRelationshipsDao } from './dao';
import { OwnershipRelationshipsRepository } from './ownership-relationships.repository';

@Injectable()
export class OwnershipRelationshipsService {
  private readonly logger = new Logger(OwnershipRelationshipsService.name);

  constructor(
    private readonly ownershipRelationshipsRepository: OwnershipRelationshipsRepository,
  ) {}

  create(
    ownershipRelationshipsDao: OwnershipRelationshipsDao,
  ): Observable<string> {
    this.logger.log(
      `Creating ownershipRelationships with ID: ${ownershipRelationshipsDao.id}`,
    );

    try {
      return from(
        this.ownershipRelationshipsRepository.create({
          ...ownershipRelationshipsDao,
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      ).pipe(map((result) => result.id));
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
      return this.ownershipRelationshipsRepository.findById(id);
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
      return this.ownershipRelationshipsRepository.update(id, {
        ...ownershipRelationshipsDao,
        updatedAt: new Date(),
      });
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
      return this.ownershipRelationshipsRepository.delete(id);
    } catch (error) {
      this.logger.error(
        `Failed to delete ownershipRelationships with ID: ${id}`,
        error,
      );
      return of(null);
    }
  }
}
