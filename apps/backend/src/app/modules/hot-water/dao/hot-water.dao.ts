import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'hot-water', versionKey: false })
export class HotWaterDao {
  @Prop({ required: true })
  id: string;

  @Prop({ required: false })
  numberOfBathtubs: number;

  @Prop({ required: false })
  numberOfShowers: number;

  @Prop({ required: false })
  typeOfShowers: string;

  @Prop({ required: false })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;
}

export const HotWaterSchema = SchemaFactory.createForClass(HotWaterDao);
