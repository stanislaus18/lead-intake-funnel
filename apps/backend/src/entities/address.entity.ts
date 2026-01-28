import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class AddressEntity {
  @Prop({ required: true })
  id: string;

  @Prop({ required: false })
  street: string;

  @Prop({ required: false })
  city: string;

  @Prop({ required: false })
  postalcode: string;

  @Prop({ required: false })
  countryCode: string;

  @Prop({ required: false })
  addressAddition: string;
}

export const AddressSchema = SchemaFactory.createForClass(AddressEntity);
