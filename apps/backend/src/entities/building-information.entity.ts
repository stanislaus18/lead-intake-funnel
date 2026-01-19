import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class BuildingInformationEntity {
  @Prop({ required: false, enum: ['Einfamilienhaus / Zweifamilienhaus', 'Doppelhaus / Reihenhaus', 'Wohnung', 'Gewerbe', 'Mehrfamilienhaus', 'Sonstiges'] })
  immoType: string;

  @Prop({ required: false, enum: ['Ja', 'Nein'] })
  heritageProtection: string;

  @Prop({ required: false })
  constructionYear: number;

  @Prop({ required: false })
  livingSpace: number;

  @Prop({ required: false })
  constructionYearString: string;

  @Prop({ required: false })
  residentialUnits: number;

  @Prop({ required: false, enum: ['weniger als 4qm', 'mehr als 4 qm'] })
  boilerRoomSize: string;

  @Prop({ required: false, enum: ['niedriger als 180 cm', '180 - 199 cm', 'höher als 199 cm'] })
  installationLocationCeilingHeight: string;

  @Prop({ required: false, enum: ['Ja', 'Nein'] })
  widthPathway: string;

  @Prop({ required: false, enum: ['Ja', 'Nein'] })
  heightPathway: string;

  @Prop({ required: false, enum: ['no_room', 'one_room', 'two_rooms_or_more'] })
  roomsBetweenHeatingRoomAndOutdoorUnit: string;

  @Prop({ required: false, enum: ['Keller', 'Ergeschoss', 'Obergeschoss', 'Dachgeschoss'] })
  meterClosetLocation: string;

  @Prop({ required: false, enum: ['Keller', 'Ergeschoss', 'Obergeschoss', 'Dachgeschoss'] })
  electricityConnectionLocation: string;

  @Prop({ required: false, enum: ['water_or_gas_pipe', 'grounding_spike_or_foundation', 'no_grounding', 'unknown'] })
  groundingType: string;

  @Prop({ required: false })
  hasSolarThermalSystem: boolean;

  @Prop({ required: false })
  personsHousehold: number;
}

export const BuildingInformationSchema = SchemaFactory.createForClass(BuildingInformationEntity);
