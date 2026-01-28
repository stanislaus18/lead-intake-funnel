import { HttpException, Injectable, Logger } from '@nestjs/common';
import {
  Observable,
  catchError,
  combineLatest,
  forkJoin,
  of,
  switchMap,
} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { LeadIntakeFunnelDao } from './dao';
import { LeadIntakeFunnelRepository } from './lead-intake-funnel.repository';
import { ContactService } from '../contact/contact.service';
import { CreateLeadIntakeFunnelDto } from './dto';
import { LeadIntakeFunnel } from './model';
import { BuildingService } from '../building/building.service';
import { HeatingSystemService } from '../heating-system/heating-system.service';
import { HeatingSystem } from '../heating-system/model';
import { Project } from '../project/model';
import { ProjectService } from '../project/project.service';

@Injectable()
export class LeadIntakeFunnelService {
  private readonly logger = new Logger(LeadIntakeFunnelService.name);

  constructor(
    private readonly leadIntakeFunnelRepository: LeadIntakeFunnelRepository,
    private readonly contactService: ContactService,
    private readonly buildingService: BuildingService,
    private readonly heatingSystemService: HeatingSystemService,
    private readonly projectService: ProjectService,
  ) {}

  create(
    createLeadIntakeFunnelDto: CreateLeadIntakeFunnelDto,
  ): Observable<LeadIntakeFunnelDao> {
    this.logger.log(`Creating lead`);

    const leadCreationArray: Observable<string>[] = [];

    if (!createLeadIntakeFunnelDto.contact) {
      this.logger.error(`Contact information is missing`);
      throw new HttpException('Contact information is required', 400);
    }

    leadCreationArray.push(
      this.contactService.create(createLeadIntakeFunnelDto.contact),
    );

    leadCreationArray.push(
      createLeadIntakeFunnelDto.building
        ? this.buildingService.create(createLeadIntakeFunnelDto.building)
        : of(null),
    );

    leadCreationArray.push(
      createLeadIntakeFunnelDto.heatingSystem
        ? this.heatingSystemService.create(
            createLeadIntakeFunnelDto.heatingSystem,
          )
        : of(null),
    );

    leadCreationArray.push(
      createLeadIntakeFunnelDto.project
        ? this.projectService.create(createLeadIntakeFunnelDto.project)
        : of(null),
    );

    try {
      return forkJoin(leadCreationArray).pipe(
        switchMap((ids) => {
          return this.leadIntakeFunnelRepository.create(
            LeadIntakeFunnel.create({
              id: uuidv4(),
              version: '1.2.0',
              contactId: ids[0],
              buildingId: ids[1] ?? undefined,
              heatingSystemId: ids[2] ?? undefined,
              projectId: ids[3] ?? undefined,
              createdAt: new Date(),
              updatedAt: new Date(),
            }),
          );
        }),
        catchError((error) => {
          this.logger.error(`Failed to create lead`, error);
          throw new HttpException('Failed to create lead', 400);
        }),
      );
    } catch {
      throw new HttpException('Contact information is required', 400);
    }
  }
}
