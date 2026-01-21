import { defineAsyncComponent } from 'vue';

/**
 * lazy load components
 */
export const componentMap: Record<string, unknown> = {
  buildingType: defineAsyncComponent(() => import('./BuildingType.vue')),
  residentialUnit: defineAsyncComponent(() => import('./ResidentialUnit.vue')),
  apartment:  defineAsyncComponent(() => import('./Apartment.vue')),
  ownUse: defineAsyncComponent(() => import('./OwnUse.vue')),
  replaceCurrentSystem: defineAsyncComponent(() => import('./ReplaceCurrentSystem.vue')),
  heatingDetails: defineAsyncComponent(() => import('./HeatingDetails.vue')),
  noOfPerson: defineAsyncComponent(() => import('./NoOfPerson.vue')),
  heatingFuel: defineAsyncComponent(() => import('./HeatingFuel.vue')),
  heatingConsumption: defineAsyncComponent(() => import('./HeatingConsumption.vue')),
  heatingYears: defineAsyncComponent(() => import('./HeatingYears.vue')),
  heatingTypeForRoom: defineAsyncComponent(() => import('./HeatingTypeForRoom.vue')),
  underFloorHeating: defineAsyncComponent(() => import('./UnderFloorHeating.vue')),
  heaterLocation: defineAsyncComponent(() => import('./HeaterLocation.vue')),
  heatingRoomFloor: defineAsyncComponent(() => import('./HeatingRoomFloor.vue')),
  heatingRoomHeight: defineAsyncComponent(() => import('./HeatingRoomHeight.vue')),
  heatingRoomWidth: defineAsyncComponent(() => import('./HeatingRoomWidth.vue')),
  heatingRoomEntranceHeight: defineAsyncComponent(() => import('./HeatingRoomEntranceHeight.vue')),
  listedBuilding: defineAsyncComponent(() => import('./ListedBuilding.vue')),
  householdIncome: defineAsyncComponent(() => import('./HouseholdIncome.vue')),
  installation: defineAsyncComponent(() => import('./Installation.vue')),
};
