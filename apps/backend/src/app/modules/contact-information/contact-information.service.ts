import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, map, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { ContactInformationDao } from './dao';
import { ContactInformationRepository } from './contact-information.repository';

@Injectable()
export class ContactInformationService {
  private readonly logger = new Logger(ContactInformationService.name);

  constructor(
    private readonly contactInformationRepository: ContactInformationRepository,
  ) {}

  create(contactInformationDao: ContactInformationDao): Observable<string> {
    this.logger.log(
      `Creating contact information with ID: ${contactInformationDao.id}`,
    );

    try {
      return from(
        this.contactInformationRepository.create({
          ...contactInformationDao,
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      ).pipe(map((result) => result.id));
    } catch (error) {
      this.logger.error(
        `Failed to create contact information with ID: ${contactInformationDao.id}`,
        error,
      );
      return of(null);
    }
  }
}
