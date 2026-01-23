import { useLeadStore } from './../../stores/leadStore';

const store = useLeadStore();

export function setCurrentView(view: string) {
    store.setCurrentView(view);
}
