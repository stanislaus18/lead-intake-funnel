import { useLeadStore } from '../../stores/leadStore';

const store = useLeadStore();

export function setHouseholdIncome(householdIncome: string) {
  store.lead = {
    ...store.lead,
    project: { ...store.lead.project, householdIncome },
  };
}
