import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'project', versionKey: false })
export class ProjectDao {
  @Prop({ required: true })
  id: string;

  @Prop({ required: false })
  timeline: string;

  @Prop({ required: false })
  householdIncome: string;

  @Prop({ required: false })
  statusOfFoundationConstruction: string;

  @Prop({ required: false })
  infosLeadsource: string;

  @Prop({ required: false })
  fullReplacementOfHeatingSystemPlanned: boolean;

  @Prop({ required: false, type: [String], default: [] })
  additionalDisposal: string[];

  @Prop({ required: false })
  shouldKeepSolarThermalSystem: boolean;

  @Prop({ required: false })
  picturesId: string;

  @Prop({ required: false })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(ProjectDao);
