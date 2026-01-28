import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'marketing', versionKey: false })
export class MarketingDao {
  @Prop({ required: true })
  id: string;

  @Prop({ required: false })
  customerLoyaltyProgramType: string;

  @Prop({ required: false })
  customerLoyaltyProgramId: string;

  @Prop({ required: false })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;
}

export const MarketingSchema = SchemaFactory.createForClass(MarketingDao);
