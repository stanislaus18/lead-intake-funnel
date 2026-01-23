import { useLeadStore } from '../../stores/leadStore';

const store = useLeadStore();

export function setWidthPathway(widthPathway: string) {
  store.lead = { ...store.lead, building: { ...store.lead.building, buildingInformation: { ...store.lead.building.buildingInformation, widthPathway } } };
}
