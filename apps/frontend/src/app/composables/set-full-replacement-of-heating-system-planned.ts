import { useLeadStore } from '../../stores/leadStore';

const store = useLeadStore();

export function setFullReplacementOfHeatingSystemPlanned(
  fullReplacementOfHeatingSystemPlanned: boolean,
) {
  store.lead = {
    ...store.lead,
    project: {
      ...store.lead.project,
      fullReplacementOfHeatingSystemPlanned,
    },
  };
}
