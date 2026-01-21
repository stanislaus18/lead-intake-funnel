<script setup lang="ts">
import { useLeadStore } from './../../stores/leadStore';
import { useRouter } from 'vue-router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import EinfamilienhausSvg from '@/assets/Einfamilienhaus.svg';
// eslint-disable-next-line @nx/enforce-module-boundaries
import DoppelhausSvg from '@/assets/Doppelhaus.svg';
// eslint-disable-next-line @nx/enforce-module-boundaries
import WohnungSvg from '@/assets/Wohnung.svg';
// eslint-disable-next-line @nx/enforce-module-boundaries
import SonstigesSvg from '@/assets/Sonstiges.svg';

const store = useLeadStore();
const router = useRouter();

const items = [
  'Einfamilienhaus / Zweifamilienhaus',
  'Doppelhaus / Reihenhaus',
  'Wohnung',
  'Sonstiges',
];

const svgMap: Record<string, string> = {
  'Einfamilienhaus / Zweifamilienhaus': EinfamilienhausSvg,
  'Doppelhaus / Reihenhaus': DoppelhausSvg,
  Wohnung: WohnungSvg,
  Sonstiges: SonstigesSvg,
};

function selectedBuilding(item: string) {
  // set into the state
  store.setBuildingType(item);

  if (item === 'Wohnung') {
    store.setCurrentView('apartment');
    return;
  }

  if (item === 'Sonstiges') {
    store.setCurrentView('otherBuildingTypes');
    return;
  }

  store.setCurrentView('residentialUnit');
}
</script>

<template>
  <p class="text-center">In was für einem Gebäude wohnst du?</p>
  <div class="building-container">
    <div
      v-for="item in items"
      :key="item"
      class="box"
      @click="selectedBuilding(item)"
    >
      <img :src="svgMap[item]" alt="Building type image" />
      <p>{{ item }}</p>
    </div>
  </div>
</template>

<style>
.building-container {
  display: flex;
  column-gap: inherit;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
}

.box {
  width: 200px;
  height: 200px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  border-radius: 50px;
  cursor: pointer;
}

.box img {
  width: 100px;
  height: 100px;
  margin-bottom: 12px;
}

.box p {
  text-align: center;
}

/* Mobile friendly: stack nicely */
@media (max-width: 480px) {
  .box {
    width: 100%;
    max-width: 200px;
  }
}
</style>
