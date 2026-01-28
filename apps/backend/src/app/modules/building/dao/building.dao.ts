import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'buildings', versionKey: false })
export class BuildingDao {
  @Prop({ required: true })
  id: string;

  @Prop({ required: false })
  version: string;

  @Prop({ required: false })
  leadId: string;

  @Prop({ required: false })
  type: string;

  @Prop({ required: false })
  addressId: string;

  @Prop({ required: false })
  buildingInformationId: string;

  @Prop({ required: false })
  ownershipRelationshipsId: string;

  @Prop({ required: false })
  energyRelevantInformationId: string;

  @Prop({ required: false })
  hotWaterId: string;

  @Prop({ required: false })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;
}

export const BuildingSchema = SchemaFactory.createForClass(BuildingDao);
