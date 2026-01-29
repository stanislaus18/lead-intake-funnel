import { useLeadStore } from '../../stores/leadStore';

const store = useLeadStore();

export function setOwnerOccupiedHousing(ownerOccupiedHousing: boolean) {
  store.lead = {
    ...store.lead,
    building: {
      ...store.lead.building,
      ownershipRelationships: {
        ...store.lead.building.ownershipRelationships,
        ownerOccupiedHousing,
      },
    },
  };
}
