import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class OwnershipRelationshipsEntity {
  @Prop({ required: false, enum: ['Eigentümer', 'Teileigentümer', 'Sonstiges'] })
  ownershipRelationship: string;

  @Prop({ required: false })
  ownershipRelationshipExplanation: string;

  @Prop({ required: false })
  numberOfOwners: number;

  @Prop({ required: false })
  ownerOccupiedHousing: boolean;

  @Prop({ required: false, enum: ['one_owner', 'two_owners', 'community_of_owners'] })
  type: string;
}

export const OwnershipRelationshipsSchema = SchemaFactory.createForClass(OwnershipRelationshipsEntity);
