import { defineStore } from 'pinia';

export const useLeadStore = defineStore('lead', {
  state: () => ({
    lead: {},
    currentView: 'buildingType',
  }),
  actions: {
    setBuildingType(immoType: string) {
      this.lead = { ...this.lead, buildingInformation: { immoType } };
    },
    setResidentialUnit(residentialUnits: number) {
      this.lead = { ...this.lead, buildingInformation: { residentialUnits } };
    },
    setCurrentView(view: string) {
      this.currentView = view;
    },
  },
  getters: {
    getLead: (state) => state.lead,
    getCurrentView: (state) => state.currentView,
  },
});
