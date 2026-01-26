<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue';

import { useLeadStore } from './../../stores/leadStore';
import {
  componentMap,
  defaultComponent,
} from './../building-type/componentMap';
// eslint-disable-next-line @nx/enforce-module-boundaries
import ZurukSvg from '@/assets/Zuruk.svg';
// eslint-disable-next-line @nx/enforce-module-boundaries
import VorwartSvg from '@/assets/Vorwart.svg';
import { fromEvent, mapTo } from 'rxjs';

/**
 * Ideally, we would keeping a seperate flow creator and inject into the store
 */
const store = useLeadStore();

/**
 * Lets add the offline and online mechnicsm here to notify service worker
 */
fromEvent(window, 'online').pipe(mapTo(true)).subscribe(() => {
  // Notify service worker to upload pending images
  console.log('App is back online, notifying service worker to upload pending images.');
  navigator.serviceWorker.ready.then((registration: any) => {
    registration.active.postMessage({
      type: 'UPLOAD_IMAGES',
    })
  })
});

fromEvent(window, 'offline').pipe(mapTo(true)).subscribe(() => {
  // Notify service worker to upload pending images
  console.log('App is offline');
});

const OtherBuildingTypes = defineAsyncComponent(defaultComponent);
const childRef = ref(null);

const hasValidateMethod = computed(() => {
  return typeof (childRef.value as any)?.validateAndNextPage === 'function';
});

const hideBackButton = computed(() => {
  return store.getCurrentView === 'personsInfo';
});

function triggerChild() {
  if (hasValidateMethod.value) {
    (childRef.value as any).validateAndNextPage();
  }
}

const componentToShow = computed(() => {
  return componentMap[store.getCurrentView] || OtherBuildingTypes;
});
</script>

<template>
  <div class="building-type-container">
    <component
      :is="componentToShow"
      ref="childRef"
    />
    <button
      v-if="store.routeList.length > 1 && !hideBackButton"
      class="btn"
      @click="store.removeRouteFormList()"
    >
      <img
        :src="ZurukSvg"
        alt="Zurück image"
      > Zurück
    </button>
    <button
      v-if="hasValidateMethod"
      class="btn"
      @click="triggerChild"
    >
      <img
        :src="VorwartSvg"
        alt="Weiter image"
      > Weiter
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

.btn:hover img {
  filter: invert(1) brightness(1.2);
}

img {
  width: 24px;
  position: relative;
  top: 7px;
}
</style>
