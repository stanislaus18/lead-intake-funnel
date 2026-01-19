import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class MarketingEntity {
  @Prop({ required: true })
  id: string;

  @Prop({ required: false })
  customerLoyaltyProgramType: string;

  @Prop({ required: false })
  customerLoyaltyProgramId: string;
}

export const MarketingSchema = SchemaFactory.createForClass(MarketingEntity);
