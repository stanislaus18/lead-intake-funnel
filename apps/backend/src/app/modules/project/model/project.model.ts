import { plainToInstance } from 'class-transformer';
import { ProjectDao } from '../dao';

export class Project {
  readonly id: string;
  readonly timeline: string;
  readonly householdIncome: string;
  readonly statusOfFoundationConstruction: string;
  readonly infosLeadsource: string;
  readonly fullReplacementOfHeatingSystemPlanned: boolean;
  readonly additionalDisposal: string[];
  readonly shouldKeepSolarThermalSystem: boolean;
  readonly picturesId: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  static create(project: Project): ProjectDao {
    return plainToInstance(ProjectDao, project, {
      enableImplicitConversion: true,
    });
  }

  static from(project: ProjectDao): Project {
    return { ...project };
  }
}
