import { useLeadStore } from './../../stores/leadStore';

const store = useLeadStore();

export function removeRouteFormList() {
    store.removeRouteFormList();
}
