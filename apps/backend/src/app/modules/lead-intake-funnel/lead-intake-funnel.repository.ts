import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, of } from 'rxjs';

import { LeadIntakeFunnelDao } from './dao';

@Injectable()
export class LeadIntakeFunnelRepository {
  private readonly logger = new Logger(LeadIntakeFunnelRepository.name);

  constructor(
    @InjectModel(LeadIntakeFunnelDao.name)
    private readonly leadIntakeFunnelModel: Model<LeadIntakeFunnelDao>,
  ) {}

  create(
    leadIntakeFunnelDao: LeadIntakeFunnelDao,
  ): Observable<LeadIntakeFunnelDao> {
    this.logger.log(`Creating lead with ID: ${leadIntakeFunnelDao.id}`);

    if (leadIntakeFunnelDao)
      try {
        return from(
          this.leadIntakeFunnelModel.create({
            ...leadIntakeFunnelDao,
            createdAt: new Date(),
            updatedAt: new Date(),
          }),
        );
      } catch (error) {
        this.logger.error(
          `Failed to create lead with ID: ${leadIntakeFunnelDao.id}`,
          error,
        );
        return of(null);
      }
  }

  findById(id: string): Observable<LeadIntakeFunnelDao> {
    this.logger.log(`Finding lead with ID: ${id}`);

    try {
      return from(this.leadIntakeFunnelModel.findOne({ id }));
    } catch (error) {
      this.logger.error(`Failed to find lead with ID: ${id}`, error);
      return of(null);
    }
  }

  findAll(): Observable<LeadIntakeFunnelDao[]> {
    this.logger.log(`Finding all leads`);

    try {
      return from(this.leadIntakeFunnelModel.find()) as any;
    } catch (error) {
      this.logger.error(`Failed to find all leads`, error);
      return of([]);
    }
  }

  update(
    id: string,
    leadIntakeFunnelDao: Partial<LeadIntakeFunnelDao>,
  ): Observable<LeadIntakeFunnelDao> {
    this.logger.log(`Updating lead with ID: ${id}`);

    try {
      return from(
        this.leadIntakeFunnelModel.findOneAndUpdate(
          { id },
          { ...leadIntakeFunnelDao, updatedAt: new Date() },
          { new: true },
        ),
      );
    } catch (error) {
      this.logger.error(`Failed to update lead with ID: ${id}`, error);
      return of(null);
    }
  }

  delete(id: string): Observable<any> {
    this.logger.log(`Deleting lead with ID: ${id}`);

    try {
      return from(this.leadIntakeFunnelModel.deleteOne({ id }));
    } catch (error) {
      this.logger.error(`Failed to delete lead with ID: ${id}`, error);
      return of(null);
    }
  }
}
