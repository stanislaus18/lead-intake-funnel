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
  <p class="title">
    In was für einem Gebäude wohnst du?
  </p>
  <div class="building-container">
    <div
      v-for="item in items"
      :key="item"
      class="box"
      @click="selectedBuilding(item)"
    >
      <img
        :src="svgMap[item]"
        alt="Building type image"
      >
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
  justify-content: center;
}

.title {
  text-align: center;
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

</style>
