import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class HeatingSystemEntity {
  @Prop({ required: true })
  id: string;

  @Prop({ required: false })
  consumption: number;

  @Prop({ required: false, enum: ['Liter (l)', 'Kilowattstunden (kWh)'] })
  consumptionUnit: string;

  @Prop({
    required: false,
    enum: [
      'Fernwärme',
      'Gasetagenheizung',
      'Kohle',
      'Heizöl',
      'Wärmepumpe',
      'Erdgas',
      'Flüssiggas',
      'Pellet-/Holzheizung',
      'Sonstiges',
    ],
  })
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

  @Prop({
    required: false,
    enum: ['no', 'unknown', 'yes_but_inactive', 'yes_and_active'],
  })
  domesticHotWaterCirculationPump: string;

  @Prop({
    required: false,
    enum: ['no', 'unknown', 'yes', 'water_filter_and_pressure_reducer'],
  })
  domestic_water_station: string;
}

export const HeatingSystemSchema =
  SchemaFactory.createForClass(HeatingSystemEntity);
