import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, of } from 'rxjs';

import { ProjectDao } from './dao';

@Injectable()
export class ProjectRepository {
  private readonly logger = new Logger(ProjectRepository.name);

  constructor(
    @InjectModel(ProjectDao.name)
    private readonly projectModel: Model<ProjectDao>,
  ) {}

  create(projectDao: ProjectDao): Observable<ProjectDao> {
    this.logger.log(`Creating project with ID: ${projectDao.id}`);

    try {
      return from(
        this.projectModel.create({
          ...projectDao,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      );
    } catch (error) {
      this.logger.error(
        `Failed to create project with ID: ${projectDao.id}`,
        error,
      );
      return of(null);
    }
  }

  findById(id: string): Observable<ProjectDao> {
    this.logger.log(`Finding project with ID: ${id}`);

    try {
      return from(this.projectModel.findOne({ id }));
    } catch (error) {
      this.logger.error(`Failed to find project with ID: ${id}`, error);
      return of(null);
    }
  }

  update(
    id: string,
    projectDao: Partial<ProjectDao>,
  ): Observable<ProjectDao> {
    this.logger.log(`Updating project with ID: ${id}`);

    try {
      return from(
        this.projectModel.findOneAndUpdate(
          { id },
          { ...projectDao, updatedAt: new Date() },
          { new: true },
        ),
      );
    } catch (error) {
      this.logger.error(`Failed to update project with ID: ${id}`, error);
      return of(null);
    }
  }

  delete(id: string): Observable<any> {
    this.logger.log(`Deleting project with ID: ${id}`);

    try {
      return from(this.projectModel.deleteOne({ id }));
    } catch (error) {
      this.logger.error(`Failed to delete project with ID: ${id}`, error);
      return of(null);
    }
  }
}
