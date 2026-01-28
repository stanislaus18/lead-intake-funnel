import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'picture-urls', versionKey: false })
export class PictureUrlDao {
  @Prop({ required: true })
  id: string;

  @Prop({ required: false })
  url: string;

  @Prop({ required: false })
  createdAt?: Date;

  @Prop({ required: false })
  updatedAt?: Date;
}

export const PictureUrlSchema = SchemaFactory.createForClass(PictureUrlDao);
