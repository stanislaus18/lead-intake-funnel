import { useLeadStore } from './../../stores/leadStore';

const store = useLeadStore();

export function setSystemType(systemType: string) {
  store.lead = { ...store.lead, heatingSystem: { systemType } };
}