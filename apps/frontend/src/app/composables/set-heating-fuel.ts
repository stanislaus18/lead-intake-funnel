import { useLeadStore } from '../../stores/leadStore';

const store = useLeadStore();

export function setHeatingFuel(systemType: string) {
  store.lead = { ...store.lead, heatingSystem: { ...store.lead.heatingSystem, systemType } };
}
