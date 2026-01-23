import { useLeadStore } from '../../stores/leadStore';

const store = useLeadStore();

export function setInstallationTimeline(timeline: string) {
  store.lead = {
    ...store.lead,
    project: { ...store.lead.project, timeline },
  };
}
