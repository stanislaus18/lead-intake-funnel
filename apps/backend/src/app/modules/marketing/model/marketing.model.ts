import { plainToInstance } from 'class-transformer';
import { MarketingDao } from '../dao';

export class Marketing {
  readonly id?: string;
  readonly customerLoyaltyProgramType?: string;
  readonly customerLoyaltyProgramId?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  static create(marketing: Marketing): MarketingDao {
    return plainToInstance(MarketingDao, marketing, {
      enableImplicitConversion: true,
    });
  }

  static from(marketingDao: MarketingDao): Marketing {
    return {
      id: marketingDao.id,
      customerLoyaltyProgramType: marketingDao.customerLoyaltyProgramType,
      customerLoyaltyProgramId: marketingDao.customerLoyaltyProgramId,
      createdAt: marketingDao.createdAt,
      updatedAt: marketingDao.updatedAt,
    };
  }
}
