import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'contacts', versionKey: false })
export class ContactDao {
  @Prop({ required: true })
  id?: string;

  @Prop({ required: false })
  contactInformationId?: string;

  @Prop({ required: false })
  addressId?: string;

  @Prop({ required: false })
  marketingId?: string;

  @Prop({ required: false })
  createdAt?: Date;

  @Prop({ required: false })
  updatedAt?: Date;
}

export const ContactSchema = SchemaFactory.createForClass(ContactDao);
