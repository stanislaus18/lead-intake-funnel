import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'addresses', versionKey: false })
export class AddressDao {
  @Prop({ required: true })
  id: string;

  @Prop({ required: false })
  street: string;

  @Prop({ required: false })
  houseNumber: string;

  @Prop({ required: false })
  city: string;

  @Prop({ required: false })
  postalcode: string;

  @Prop({ required: false })
  countryCode: string;

  @Prop({ required: false })
  addressAddition: string;

  @Prop({ required: false })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;
}

export const AddressSchema = SchemaFactory.createForClass(AddressDao);
