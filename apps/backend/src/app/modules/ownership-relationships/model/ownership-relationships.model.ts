import { plainToInstance } from 'class-transformer';
import { OwnershipRelationshipsDao } from '../dao';

export class OwnershipRelationships {
  readonly id?: string;
  readonly ownershipRelationship?: string;
  readonly ownershipRelationshipExplanation?: string;
  readonly numberOfOwners?: number;
  readonly ownerOccupiedHousing?: boolean;
  readonly type?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  static create(
    ownershipRelationships: OwnershipRelationships,
  ): OwnershipRelationshipsDao {
    return plainToInstance(OwnershipRelationshipsDao, ownershipRelationships, {
      enableImplicitConversion: true,
    });
  }

  static from(
    ownershipRelationships: OwnershipRelationshipsDao,
  ): OwnershipRelationships {
    return {
      id: ownershipRelationships.id,
      ownershipRelationship: ownershipRelationships.ownershipRelationship,
      ownershipRelationshipExplanation:
        ownershipRelationships.ownershipRelationshipExplanation,
      numberOfOwners: ownershipRelationships.numberOfOwners,
      ownerOccupiedHousing: ownershipRelationships.ownerOccupiedHousing,
      type: ownershipRelationships.type,
      createdAt: ownershipRelationships.createdAt,
      updatedAt: ownershipRelationships.updatedAt,
    };
  }
}
