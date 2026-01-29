import { useLeadStore } from '../../stores/leadStore';

const store = useLeadStore();

export function setHeatedArea(heatedArea: number) {
  store.lead = {
    ...store.lead,
    building: {
      ...store.lead.building,
      energyRelevantInformation: {
        ...store.lead.building.energyRelevantInformation,
        heatedArea,
      },
    },
  };
}
