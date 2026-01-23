import { useLeadStore } from '../../stores/leadStore';

const store = useLeadStore();

export function setHeatingConsumption(consumption: string, consumptionUnit: string) {
  store.lead = { ...store.lead, heatingSystem: { ...store.lead.heatingSystem, consumption, consumptionUnit }};
}
