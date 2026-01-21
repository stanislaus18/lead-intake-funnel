<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';

import { useLeadStore } from './../../stores/leadStore';
import {
  componentMap,
  defaultComponent,
} from './../building-type/componentMap';
// eslint-disable-next-line @nx/enforce-module-boundaries
import ZurukSvg from '@/assets/Zuruk.svg';

/**
 * Ideally, we would keeping a seperate flow creator and inject into the store
 */
const store = useLeadStore();

const OtherBuildingTypes = defineAsyncComponent(defaultComponent);

const componentToShow = computed(() => {
  return componentMap[store.getCurrentView] || OtherBuildingTypes;
});
</script>

<template>
  <div class="building-type-container">
    <component :is="componentToShow" />
    <button
      v-if="store.routeList.length > 1"
      class="btn"
      @click="store.removeRouteFormList()"
    >
      <img :src="ZurukSvg" alt="Zurück image" /> Zurück
    </button>
  </div>
</template>

<style scoped>
.building-type-container {
  background-color: var(--swatch--off-white);
}

.btn {
  background-color: #d1d5db;
  color: #1f2937;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  margin-left: 30%;
}

.btn:hover {
  background-color: #000000;
  color: white;
}

img {
  width: 24px;
  position: relative;
  top: 7px;
}
</style>
