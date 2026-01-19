import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LeadIntakeFunnelDocument = HydratedDocument<LeadIntakeFunnelEntity>;

@Schema({ collection: 'lead-intake-funnel'})
export class LeadIntakeFunnelEntity {
  @Prop({ required: true })
  version: string;

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  contactId: string;

  @Prop({ required: false })
  buildingId: string;

  @Prop({ required: false })
  heatingSystemId: string;

  @Prop({ required: false })
  projectId: string;
}

export const LeadIntakeFunnelSchema = SchemaFactory.createForClass(LeadIntakeFunnelEntity);