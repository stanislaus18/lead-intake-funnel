import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'building-information', versionKey: false })
export class BuildingInformationDao {
  @Prop({ required: true })
  id: string;

  @Prop({ required: false })
  immoType: string;

  @Prop({ required: false })
  heritageProtection: string;

  @Prop({ required: false })
  constructionYear: number;

  @Prop({ required: false })
  livingSpace: number;

  @Prop({ required: false })
  constructionYearString: string;

  @Prop({ required: false })
  residentialUnits: number;

  @Prop({ required: false })
  boilerRoomSize: string;

  @Prop({ required: false })
  installationLocationCeilingHeight: string;

  @Prop({ required: false })
  widthPathway: string;

  @Prop({ required: false })
  heightPathway: string;

  @Prop({ required: false })
  roomsBetweenHeatingRoomAndOutdoorUnit: string;

  @Prop({ required: false })
  meterClosetLocation: string;

  @Prop({ required: false })
  electricityConnectionLocation: string;

  @Prop({ required: false })
  groundingType: string;

  @Prop({ required: false })
  hasSolarThermalSystem: boolean;

  @Prop({ required: false })
  personsHousehold: number;

  @Prop({ required: false })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;
}

export const BuildingInformationSchema = SchemaFactory.createForClass(
  BuildingInformationDao,
);
