import { getNotApplicableTextBased } from '../app/composables/get-not-applicable-text-based';
import { defineStore } from 'pinia';

export const useLeadStore = defineStore('lead', {
  state: () => ({
    lead: {} as any,
    currentView: 'buildingType',
    notApplicableDetails: { title: '', description: '' },
    routeList: ['buildingType'],
  }),
  actions: {
    setCurrentView(view: string) {
      this.currentView = view;
      this.routeList.push(view);
    },
    removeRouteFormList() {
      this.routeList.pop();
      this.currentView = this.routeList[this.routeList.length - 1];
    },
  },
  getters: {
    getLead: (state) => state.lead,
    getCurrentView: (state) => state.currentView,
    getNotApplicableDetails: (state) => {
      return state.notApplicableDetails;
    },
  },
});
