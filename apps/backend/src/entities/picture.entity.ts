import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PictureUrlEntity {
  @Prop({ required: false })
  url: string;
}

export const PictureUrlSchema = SchemaFactory.createForClass(PictureUrlEntity);

@Schema()
export class PicturesEntity {
  @Prop({ type: [PictureUrlEntity], required: false, default: [] })
  outdoorUnitLocation: PictureUrlEntity[];

  @Prop({ type: [PictureUrlEntity], required: false, default: [] })
  outdoorUnitLocationWithArea: PictureUrlEntity[];

  @Prop({ type: [PictureUrlEntity], required: false, default: [] })
  heatingRoom: PictureUrlEntity[];

  @Prop({ type: [PictureUrlEntity], required: false, default: [] })
  meterClosetWithDoorOpen: PictureUrlEntity[];

  @Prop({ type: [PictureUrlEntity], required: false, default: [] })
  meterClosetSlsSwitchDetailed: PictureUrlEntity[];

  @Prop({ type: [PictureUrlEntity], required: false, default: [] })
  floorHeatingDistributionWithDoorOpen: PictureUrlEntity[];
}



export const PicturesSchema = SchemaFactory.createForClass(PicturesEntity);