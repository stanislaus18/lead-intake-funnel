import { useLeadStore } from '../../stores/leadStore';
import { getNotApplicableTextBased } from './get-not-applicable-text-based';

const store = useLeadStore();

export function getNotApplicableDetails() {
  return store.getNotApplicableDetails;
}

export function setNotApplicableDetails(viewName: string) {
  const details = getNotApplicableTextBased(viewName) as {
    title: string;
    description: string;
  };
  store.notApplicableDetails = details;
}
