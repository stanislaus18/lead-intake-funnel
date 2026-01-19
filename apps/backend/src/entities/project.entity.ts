import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PicturesEntity } from './picture.entity';


@Schema()
export class ProjectEntity {
  @Prop({ required: false, enum: ['Sofort', '1-3 Monate', '3-6 Monate', '>6 Monate'] })
  timeline: string;

  @Prop({ required: false, enum: ['more_than_40k_gross', 'less_than_40k_gross', 'no_answer'] })
  householdIncome: string;

  @Prop({ required: false, enum: ['Vamo', 'Kunde', 'Kein Fundament notwendig'] })
  statusOfFoundationConstruction: string;

  @Prop({ required: false })
  infosLeadsource: string;

  @Prop({ required: false })
  fullReplacementOfHeatingSystemPlanned: boolean;

  @Prop({
    required: false,
    type: [String],
    enum: [
      'oil_tank_plastic_up_to_5000l',
      'oil_tank_plastic_more_than_5000l',
      'oil_tank_steel_up_to_5000l',
      'oil_tank_steel_more_than_5000l',
      'heatpump',
      'liquid_gas_tank',
    ],
    default: [],
  })
  additionalDisposal: string[];

  @Prop({ required: false })
  shouldKeepSolarThermalSystem: boolean;

  @Prop({ type: PicturesEntity, required: false, _id: false })
  pictures: PicturesEntity;
}

export const ProjectSchema = SchemaFactory.createForClass(ProjectEntity);
