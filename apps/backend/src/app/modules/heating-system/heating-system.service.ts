import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, map, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { HeatingSystemDao } from './dao';
import { HeatingSystemRepository } from './heating-system.repository';
import { CreateHeatingSystemDto } from './dto';
import { HeatingSystem } from './model';

@Injectable()
export class HeatingSystemService {
  private readonly logger = new Logger(HeatingSystemService.name);

  constructor(
    private readonly heatingSystemRepository: HeatingSystemRepository,
  ) {}

  create(createHeatingSystemDto: CreateHeatingSystemDto): Observable<string> {
    this.logger.log(`Creating heating system`);

    const heatingSystemDao: HeatingSystemDao = {
      ...(createHeatingSystemDto as HeatingSystem),
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      return from(this.heatingSystemRepository.create(heatingSystemDao)).pipe(
        map((result) => result.id),
      );
    } catch (error) {
      this.logger.error(`Failed to create heating system`, error);
      return of(null);
    }
  }

  findById(id: string): Observable<HeatingSystemDao> {
    this.logger.log(`Finding heating system with ID: ${id}`);

    try {
      return this.heatingSystemRepository.findById(id);
    } catch (error) {
      this.logger.error(`Failed to find heating system with ID: ${id}`, error);
      return of(null);
    }
  }

  update(
    id: string,
    heatingSystemDao: Partial<HeatingSystemDao>,
  ): Observable<HeatingSystemDao> {
    this.logger.log(`Updating heating system with ID: ${id}`);

    try {
      return this.heatingSystemRepository.update(id, {
        ...heatingSystemDao,
        updatedAt: new Date(),
      });
    } catch (error) {
      this.logger.error(
        `Failed to update heating system with ID: ${id}`,
        error,
      );
      return of(null);
    }
  }

  delete(id: string): Observable<any> {
    this.logger.log(`Deleting heating system with ID: ${id}`);

    try {
      return this.heatingSystemRepository.delete(id);
    } catch (error) {
      this.logger.error(
        `Failed to delete heating system with ID: ${id}`,
        error,
      );
      return of(null);
    }
  }
}
