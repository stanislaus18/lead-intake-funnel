<script setup lang="ts">
import { computed, ref } from 'vue';
import { useLeadStore } from './../../stores/leadStore';

import BuildingType from './BuildingType.vue';
import ResidentialUnit from './ResidentialUnit.vue';
import Apartment from './Apartment.vue';
import OtherBuildingTypes from './OtherBuildingTypes.vue';

const store = useLeadStore();

const componentToShow = computed(() => {
  switch (store.getCurrentView) {
    case 'buildingType':
      return BuildingType;
    case 'residentialUnit':
      return ResidentialUnit;
    case 'apartment':
      return Apartment;
    default:
      return OtherBuildingTypes;
  }
});
</script>

<template>
  <div class="building-type-container">
    <component :is="componentToShow" />
  </div>
</template>

<style scoped>
.building-type-container {
  background-color: var(--swatch--off-white);
}
</style>
