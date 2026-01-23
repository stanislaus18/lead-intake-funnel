import { defineStore } from 'pinia';

export const useLeadStore = defineStore('lead', {
  state: () => ({
    lead: {} as any,
    currentView: 'buildingType',
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
  },
});
