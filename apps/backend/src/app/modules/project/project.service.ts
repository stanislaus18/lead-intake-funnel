import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { ProjectDao } from './dao';
import { ProjectRepository } from './project.repository';
import { PicturesService } from '../pictures/pictures.service';
import { CreateProjectDto } from './dto';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);

  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly picturesService: PicturesService,
  ) {}

  create(createProjectDto: CreateProjectDto): Observable<string> {
    this.logger.log(`Creating project`);

    return this.picturesService.create(createProjectDto.pictures).pipe(
      switchMap((picturesId: string) => {
        const projectDao: ProjectDao = {
          id: uuidv4(),
          timeline: createProjectDto.timeline,
          householdIncome: createProjectDto.householdIncome,
          statusOfFoundationConstruction:
            createProjectDto.statusOfFoundationConstruction,
          infosLeadsource: createProjectDto.infosLeadsource,
          fullReplacementOfHeatingSystemPlanned:
            createProjectDto.fullReplacementOfHeatingSystemPlanned,
          additionalDisposal: createProjectDto.additionalDisposal,
          shouldKeepSolarThermalSystem:
            createProjectDto.shouldKeepSolarThermalSystem,
          picturesId: picturesId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        return this.projectRepository.create(projectDao);
      }),
      map((result) => result.id),
    );
  }

  findById(id: string): Observable<ProjectDao> {
    this.logger.log(`Finding project with ID: ${id}`);

    try {
      return this.projectRepository.findById(id);
    } catch (error) {
      this.logger.error(`Failed to find project with ID: ${id}`, error);
      return of(null);
    }
  }

  update(id: string, projectDao: Partial<ProjectDao>): Observable<ProjectDao> {
    this.logger.log(`Updating project with ID: ${id}`);

    try {
      return this.projectRepository.update(id, {
        ...projectDao,
        updatedAt: new Date(),
      });
    } catch (error) {
      this.logger.error(`Failed to update project with ID: ${id}`, error);
      return of(null);
    }
  }

  delete(id: string): Observable<any> {
    this.logger.log(`Deleting project with ID: ${id}`);

    try {
      return this.projectRepository.delete(id);
    } catch (error) {
      this.logger.error(`Failed to delete project with ID: ${id}`, error);
      return of(null);
    }
  }
}
