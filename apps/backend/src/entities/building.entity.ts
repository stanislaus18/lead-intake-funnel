import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { AddressEntity } from './address.entity';
import { BuildingInformationEntity } from './building-information.entity';
import { OwnershipRelationshipsEntity } from './ownership-relationships.entity';
import { EnergyRelevantInformationEntity } from './energy-relevant-information.entity';
import { HotWaterEntity } from './hot-water.entity';

export type BuildingDocument = HydratedDocument<BuildingEntity>;

@Schema({ collection: 'building' })
export class BuildingEntity {
  _id?: Types.ObjectId;

  @Prop({ required: true })
  version: string;

  @Prop({ required: true })
  leadId: string;

  @Prop({ required: true })
  type: string;

  @Prop({ type: AddressEntity, required: true })
  address: AddressEntity;

  @Prop({ type: BuildingInformationEntity, required: true })
  buildingInformation: BuildingInformationEntity;

  @Prop({ type: OwnershipRelationshipsEntity, required: true })
  ownershipRelationships: OwnershipRelationshipsEntity;

  @Prop({ type: EnergyRelevantInformationEntity, required: true })
  energyRelevantInformation: EnergyRelevantInformationEntity;

  @Prop({ type: HotWaterEntity, required: true })
  hotWater: HotWaterEntity;

  @Prop({ required: false })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;
}

export const BuildingSchema = SchemaFactory.createForClass(BuildingEntity);
