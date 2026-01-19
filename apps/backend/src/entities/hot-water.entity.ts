import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class HotWaterEntity {
  @Prop({ required: false })
  numberOfBathtubs: number;

  @Prop({ required: false })
  numberOfShowers: number;

  @Prop({ required: false, enum: ['Duschkopf', 'Raindance Duschkopf', 'Wasserfall-Dusche'] })
  typeOfShowers: string;
}

export const HotWaterSchema = SchemaFactory.createForClass(HotWaterEntity);
