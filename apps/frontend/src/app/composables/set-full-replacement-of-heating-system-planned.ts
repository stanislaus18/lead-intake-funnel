import { useLeadStore } from '../../stores/leadStore';

const store = useLeadStore();

export function setFullReplacementOfHeatingSystemPlanned(
  fullReplacementOfHeatingSystemPlanned: string,
) {
  store.lead = {
    ...store.lead,
    project: {
      ...store.lead.project,
      fullReplacementOfHeatingSystemPlanned,
    },
  };
}
