import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { LeadIntakeFunnelDto } from './dto/lead-intake-funnel.dto';
import { LeadIntakeFunnel } from './entities/lead-intake-funnel.entity';

@Injectable()
export class AppRepository {
  private leadRepository: Repository<LeadIntakeFunnel>;

  constructor(private dataSource: DataSource) {
    // Initialize the repository with the LeadIntakeFunnel entity
    this.leadRepository = this.dataSource.getRepository(LeadIntakeFunnel);
  }

  /**
   * Save a new lead to MongoDB
   */
  async createLead(leadData: LeadIntakeFunnelDto): Promise<any> {
    const lead = this.leadRepository.create({
      ...leadData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this.leadRepository.save(lead);
  }

  //   /**
  //    * Find a lead by ID
  //    */
  //   async findLeadById(id: string): Promise<any> {
  //     return await this.leadRepository.findOne({
  //       where: { _id: id },
  //     });
  //   }

  //   /**
  //    * Update a lead
  //    */
  //   async updateLead(
  //     id: string,
  //     leadData: Partial<LeadIntakeFunnelDto>,
  //   ): Promise<any> {
  //     await this.leadRepository.update(
  //       { _id: id },
  //       {
  //         ...leadData,
  //         updatedAt: new Date(),
  //       },
  //     );

  //     return await this.findLeadById(id);
  //   }
}
