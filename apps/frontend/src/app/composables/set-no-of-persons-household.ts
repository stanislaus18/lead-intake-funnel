import { useLeadStore } from '../../stores/leadStore';

const store = useLeadStore();

export function setPersonsHousehold(personsHousehold: string) {
  store.lead = { ...store.lead, building: { ...store.lead.building, buildingInformation: { ...store.lead.building.buildingInformation, personsHousehold } } };
}
