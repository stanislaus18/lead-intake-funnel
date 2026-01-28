import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'ownership-relationships', versionKey: false })
export class OwnershipRelationshipsDao {
  @Prop({ required: true })
  id: string;

  @Prop({ required: false })
  ownershipRelationship: string;

  @Prop({ required: false })
  ownershipRelationshipExplanation: string;

  @Prop({ required: false })
  numberOfOwners: number;

  @Prop({ required: false })
  ownerOccupiedHousing: boolean;

  @Prop({ required: false })
  type: string;

  @Prop({ required: false })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;
}

export const OwnershipRelationshipsSchema = SchemaFactory.createForClass(
  OwnershipRelationshipsDao,
);
