import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'lead-intake-funnel', versionKey: false })
export class LeadIntakeFunnelDao {
  @Prop({ required: true })
  id: string;

  @Prop({ required: false })
  version: string;

  @Prop({ required: true })
  contactId: string;

  @Prop({ required: false, nullable: true })
  buildingId: string;

  @Prop({ required: false, nullable: true })
  heatingSystemId: string;

  @Prop({ required: false, nullable: true })
  projectId: string;

  @Prop({ required: false, nullable: true })
  leadResponseId: string;

  @Prop({ required: false })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;
}

export const LeadIntakeFunnelSchema =
  SchemaFactory.createForClass(LeadIntakeFunnelDao);
