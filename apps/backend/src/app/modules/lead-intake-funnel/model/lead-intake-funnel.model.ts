import { plainToInstance } from 'class-transformer';
import { LeadIntakeFunnelDao } from '../dao';

export class LeadIntakeFunnel {
  readonly id: string;
  readonly version: string;
  readonly contactId: string;
  readonly buildingId?: string;
  readonly heatingSystemId?: string;
  readonly projectId?: string;
  readonly leadResponseId?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  static create(lead: LeadIntakeFunnel): LeadIntakeFunnelDao {
    return plainToInstance(LeadIntakeFunnelDao, lead, {
      enableImplicitConversion: true,
    });
  }

  static from(leadIntakeFunnelDao: LeadIntakeFunnelDao): LeadIntakeFunnel {
    return {
      id: leadIntakeFunnelDao.id,
      version: leadIntakeFunnelDao.version,
      contactId: leadIntakeFunnelDao.contactId,
      buildingId: leadIntakeFunnelDao.buildingId,
      heatingSystemId: leadIntakeFunnelDao.heatingSystemId,
      projectId: leadIntakeFunnelDao.projectId,
      leadResponseId: leadIntakeFunnelDao.leadResponseId,
      createdAt: leadIntakeFunnelDao.createdAt,
      updatedAt: leadIntakeFunnelDao.updatedAt,
    };
  }
}
