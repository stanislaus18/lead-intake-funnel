import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class EnergyRelevantInformationEntity {
  @Prop({ required: false })
  heatedArea: number;

  @Prop({ required: false })
  heatedAreaString: string;

  @Prop({ required: false, enum: ['Heizkörper', 'Fußbodenheizung', 'Heizkörper + Fußbodenheizung', 'Nachtspeicherofen', 'Sonstiges'] })
  typeOfHeating: string;

  @Prop({ required: false, enum: ['Unterm Dach', 'Im Keller', 'Im EG', '1.OG', 'Dachgeschoss', 'Obergeschoss', 'Keller', 'Erdgeschoss'] })
  locationHeating: string;

  @Prop({ required: false, enum: ['Yes', 'No'] })
  apartmentHeatingSystem: string;
}

export const EnergyRelevantInformationSchema = SchemaFactory.createForClass(EnergyRelevantInformationEntity);
