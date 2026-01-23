import { useLeadStore } from './../../stores/leadStore';

const store = useLeadStore();

export function setResidentialUnit(residentialUnits: number) {
  store.lead = { ...store.lead, building: { ...store.lead.building, buildingInformation: { ...store.lead.building.buildingInformation, residentialUnits } } };
  console.log('Residential Units set to:', store.lead);
}