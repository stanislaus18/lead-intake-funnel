import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LeadIntakeFunnelDocument = HydratedDocument<LeadIntakeFunnelDao>;

@Schema({ collection: 'family-approval', versionKey: false })
export class LeadIntakeFunnelDao {
  @Prop({ required: true })
  version: string;

  @Prop({ required: true })
  leadId: string;

  @Prop({ required: true })
  contactId: string;

  @Prop({ required: false })
  buildingId: string;

  @Prop({ required: false })
  heatingSystemId: string;

  @Prop({ required: false })
  projectId: string;
}

export const FamilyApprovalSchema = SchemaFactory.createForClass(LeadIntakeFunnelDao);