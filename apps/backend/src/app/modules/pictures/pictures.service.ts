import { Injectable, Logger } from '@nestjs/common';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { PicturesDao } from './dao';
import { PicturesRepository } from './pictures.repository';
import { PictureUrlService } from '../picture-url/picture-url.service';
import { CreatePicturesDto } from './dto';
import { PictureUrlDto } from '../picture-url/dto';

@Injectable()
export class PicturesService {
  private readonly logger = new Logger(PicturesService.name);

  constructor(
    private readonly picturesRepository: PicturesRepository,
    private readonly pictureUrlService: PictureUrlService,
  ) {}

  create(createPicturesDto: CreatePicturesDto): Observable<string> {
    if (!createPicturesDto) {
      this.logger.warn('No pictures data provided for creation');
      return of(null);
    }
    this.logger.log(`Creating pictures with URL`);

    const outdoorUnitLocationPictureUrl =
      createPicturesDto.outdoorUnitLocation.map((oul) =>
        this.pictureUrlService.create(PictureUrlDto.from(oul)),
      );
    const outdoorUnitLocationWithAreaPictureUrl =
      createPicturesDto.outdoorUnitLocationWithArea.map((oulwa) =>
        this.pictureUrlService.create(PictureUrlDto.from(oulwa)),
      );
    const heatingRoomPictureUrl = createPicturesDto.heatingRoom.map((hr) =>
      this.pictureUrlService.create(PictureUrlDto.from(hr)),
    );
    const meterClosetWithDoorOpenPictureUrl =
      createPicturesDto.meterClosetWithDoorOpen.map((mcwdo) =>
        this.pictureUrlService.create(PictureUrlDto.from(mcwdo)),
      );
    const meterClosetSlsSwitchDetailedPictureUrl =
      createPicturesDto.meterClosetSlsSwitchDetailed.map((mcslsd) =>
        this.pictureUrlService.create(PictureUrlDto.from(mcslsd)),
      );
    const floorHeatingDistributionWithDoorOpenPictureUrl =
      createPicturesDto.floorHeatingDistributionWithDoorOpen.map((fhdwdo) =>
        this.pictureUrlService.create(PictureUrlDto.from(fhdwdo)),
      );

    return forkJoin({
      outdoorUnitLocation: forkJoin(outdoorUnitLocationPictureUrl),
      outdoorUnitLocationWithArea: forkJoin(
        outdoorUnitLocationWithAreaPictureUrl,
      ),
      heatingRoom: forkJoin(heatingRoomPictureUrl),
      meterClosetWithDoorOpen: forkJoin(meterClosetWithDoorOpenPictureUrl),
      meterClosetSlsSwitchDetailed: forkJoin(
        meterClosetSlsSwitchDetailedPictureUrl,
      ),
      floorHeatingDistributionWithDoorOpen: forkJoin(
        floorHeatingDistributionWithDoorOpenPictureUrl,
      ),
    }).pipe(
      switchMap((data) => {
        const picturesToCreate: PicturesDao = {
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          outdoorUnitLocationIds: data.outdoorUnitLocation.map((p) => p.id),
          outdoorUnitLocationWithAreaIds: data.outdoorUnitLocationWithArea.map(
            (p) => p.id,
          ),
          heatingRoomIds: data.heatingRoom.map((p) => p.id),
          meterClosetWithDoorOpenIds: data.meterClosetWithDoorOpen.map(
            (p) => p.id,
          ),
          meterClosetSlsSwitchDetailedIds:
            data.meterClosetSlsSwitchDetailed.map((p) => p.id),
          floorHeatingDistributionWithDoorOpenIds:
            data.floorHeatingDistributionWithDoorOpen.map((p) => p.id),
        };

        return this.picturesRepository
          .create(picturesToCreate)
          .pipe(map((createdPictures) => createdPictures.id));
      }),
    );
  }

  findById(id: string): Observable<PicturesDao> {
    this.logger.log(`Finding pictures with ID: ${id}`);

    try {
      return this.picturesRepository.findById(id);
    } catch (error) {
      this.logger.error(`Failed to find pictures with ID: ${id}`, error);
      return of(null);
    }
  }

  update(
    id: string,
    picturesDao: Partial<PicturesDao>,
  ): Observable<PicturesDao> {
    this.logger.log(`Updating pictures with ID: ${id}`);

    try {
      return this.picturesRepository.update(id, {
        ...picturesDao,
        updatedAt: new Date(),
      });
    } catch (error) {
      this.logger.error(`Failed to update pictures with ID: ${id}`, error);
      return of(null);
    }
  }

  delete(id: string): Observable<any> {
    this.logger.log(`Deleting pictures with ID: ${id}`);

    try {
      return this.picturesRepository.delete(id);
    } catch (error) {
      this.logger.error(`Failed to delete pictures with ID: ${id}`, error);
      return of(null);
    }
  }
}
