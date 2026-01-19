import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ContactInformationEntity {
  @Prop({ required: true })
  id: string;

  @Prop({
    enum: ['Frau', 'Mann', 'Divers'],
    required: true,
  })
  salutation: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false, default: false })
  newsletterSingleOptIn: boolean;
}

export const ContactInformationSchema = SchemaFactory.createForClass(
  ContactInformationEntity,
);
