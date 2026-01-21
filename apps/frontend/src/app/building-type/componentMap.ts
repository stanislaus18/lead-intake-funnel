import { defineAsyncComponent, type Component } from 'vue';

const path = './../components/';

/**
 * lazy load components
 */

export const componentMap: Record<string, Component> = {
  buildingType: defineAsyncComponent(() => import(`${path}BuildingType.vue`)),
  residentialUnit: defineAsyncComponent(() => import(`${path}ResidentialUnit.vue`)),
  apartment: defineAsyncComponent(() => import(`${path}Apartment.vue`)),
  ownUse: defineAsyncComponent(() => import(`${path}OwnUse.vue`)),
  replaceCurrentSystem: defineAsyncComponent(() => import(`${path}ReplaceCurrentSystem.vue`)),
  heatingDetails: defineAsyncComponent(() => import(`${path}HeatingDetails.vue`)),
  noOfPerson: defineAsyncComponent(() => import(`${path}NoOfPerson.vue`)),
  heatingFuel: defineAsyncComponent(() => import(`${path}HeatingFuel.vue`)),
  heatingConsumption: defineAsyncComponent(() => import(`${path}HeatingConsumption.vue`)),
  heatingYears: defineAsyncComponent(() => import(`${path}HeatingYears.vue`)),
  heatingTypeForRoom: defineAsyncComponent(() => import(`${path}HeatingTypeForRoom.vue`)),
  underFloorHeating: defineAsyncComponent(() => import(`${path}UnderFloorHeating.vue`)),
  heaterLocation: defineAsyncComponent(() => import(`${path}HeaterLocation.vue`)),
  heatingRoomFloor: defineAsyncComponent(() => import(`${path}HeatingRoomFloor.vue`)),
  heatingRoomHeight: defineAsyncComponent(() => import(`${path}HeatingRoomHeight.vue`)),
  heatingRoomWidth: defineAsyncComponent(() => import(`${path}HeatingRoomWidth.vue`)),
  heatingRoomEntranceHeight: defineAsyncComponent(() => import(`${path}HeatingRoomEntranceHeight.vue`)),
  listedBuilding: defineAsyncComponent(() => import(`${path}ListedBuilding.vue`)),
  householdIncome: defineAsyncComponent(() => import(`${path}HouseholdIncome.vue`)),
  installation: defineAsyncComponent(() => import(`${path}Installation.vue`)),
};

export const defaultComponent = () => import(`${path}OtherBuildingTypes.vue`);