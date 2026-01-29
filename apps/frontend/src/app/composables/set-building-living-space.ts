import { useLeadStore } from '../../stores/leadStore';

const store = useLeadStore();

export function setBuildingLivingSpace(livingSpace: number) {
  store.lead = {
    ...store.lead,
    building: {
      ...store.lead.building,
      buildingInformation: {
        ...store.lead.building.buildingInformation,
        livingSpace,
      },
    },
  };
}
