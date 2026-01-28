import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'pictures', versionKey: false })
export class PicturesDao {
  @Prop({ required: true })
  id: string;

  @Prop({ required: false })
  outdoorUnitLocationIds: string[];

  @Prop({ required: false })
  outdoorUnitLocationWithAreaIds: string[];

  @Prop({ required: false })
  heatingRoomIds: string[];

  @Prop({ required: false })
  meterClosetWithDoorOpenIds: string[];

  @Prop({ required: false })
  meterClosetSlsSwitchDetailedIds: string[];

  @Prop({ required: false })
  floorHeatingDistributionWithDoorOpenIds: string[];

  @Prop({ required: false })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;
}

export const PicturesSchema = SchemaFactory.createForClass(PicturesDao);
