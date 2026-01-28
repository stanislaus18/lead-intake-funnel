import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'heating-system', versionKey: false })
export class HeatingSystemDao {
  @Prop({ required: true })
  id?: string;

  @Prop({ required: false })
  consumption: number;

  @Prop({ required: false })
  consumptionUnit: string;

  @Prop({ required: false })
  systemType: string;

  @Prop({ required: false })
  constructionYearHeatingSystem: number;

  @Prop({ required: false })
  constructionYearHeatingSystemString: string;

  @Prop({ required: false })
  model: string;

  @Prop({ required: false })
  floorHeatingConnectedToReturnPipe: boolean;

  @Prop({ required: false })
  floorHeatingOwnHeatingCircuit: boolean;

  @Prop({ required: false })
  floorHeatingOnlyInSmallRooms: boolean;

  @Prop({ required: false })
  numberOfFloorHeatingDistributors: number;

  @Prop({ required: false })
  numberOfRadiators: number;

  @Prop({ required: false })
  domesticHotWaterByHeatpump: boolean;

  @Prop({ required: false })
  domesticHotWaterCirculationPump: string;

  @Prop({ required: false })
  domestic_water_station: string;

  @Prop({ required: false })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;
}

export const HeatingSystemSchema =
  SchemaFactory.createForClass(HeatingSystemDao);
