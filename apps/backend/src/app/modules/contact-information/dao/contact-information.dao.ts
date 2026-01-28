import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { SalutationEnum } from '../enum';

@Schema({ collection: 'contact-information', versionKey: false })
export class ContactInformationDao {
  @Prop({ required: true })
  id: string;

  @Prop({ required: false, type: String, enum: Object.values(SalutationEnum) })
  salutation: SalutationEnum;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: false })
  newsletterSingleOptIn?: boolean;

  @Prop({ required: false })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;
}

export const ContactInformationSchema = SchemaFactory.createForClass(
  ContactInformationDao,
);
