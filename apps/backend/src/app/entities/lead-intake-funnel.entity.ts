import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectId,
} from 'typeorm';

@Entity('leads')
export class LeadIntakeFunnel {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  version: string;

  @Column({ type: 'json' })
  contact: {
    firstName: string;
    lastName: string;
    contactInformation: {
      email: string;
      phone: string;
    };
    address: {
      postCode: string;
      street?: string;
      houseNumber?: string;
      city?: string;
    };
  };

  @Column({ type: 'json', nullable: true })
  building: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  heatingSystem: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  project: {
    pictures?: {
      outdoorUnitLocation?: { url: string }[];
      outdoorUnitLocationWithArea?: { url: string }[];
      heatingRoom?: { url: string }[];
      meterClosetWithDoorOpen?: { url: string }[];
      meterClosetSlsSwitchDetailed?: { url: string }[];
      floorHeatingDistributionWithDoorOpen?: { url: string }[];
    };
  };

  @Column({ type: 'json', nullable: true })
  files: Array<{
    id: string;
    type: string;
    uploadedAt: Date;
  }>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
