import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'energy-relevant-information', versionKey: false })
export class EnergyRelevantInformationDao {
  @Prop({ required: true })
  id: string;

  @Prop({ required: false })
  heatedArea: number;

  @Prop({ required: false })
  heatedAreaString: string;

  @Prop({ required: false })
  typeOfHeating: string;

  @Prop({ required: false })
  locationHeating: string;

  @Prop({ required: false })
  apartmentHeatingSystem: string;

  @Prop({ required: false })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;
}

export const EnergyRelevantInformationSchema = SchemaFactory.createForClass(
  EnergyRelevantInformationDao,
);
