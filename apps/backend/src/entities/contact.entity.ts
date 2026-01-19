import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ContactInformationEntity } from './contact-information.entity';
import { AddressEntity } from './address.entity';
import { MarketingEntity } from './marketing.schema';

export type ContactDocument = HydratedDocument<ContactEntity>;

@Schema({ collection: 'contact' })
export class ContactEntity {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  type: string;

  @Prop({ type: ContactInformationEntity, required: true })
  contactInformation: ContactInformationEntity;

  @Prop({ type: AddressEntity, required: true })
  address: AddressEntity;

  @Prop({ type: MarketingEntity, required: false })
  marketing?: MarketingEntity;

  @Prop({ required: false })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;
}

export const ContactSchema = SchemaFactory.createForClass(ContactEntity);