<script setup lang="ts">
import { useLeadStore } from './../../stores/leadStore';
// eslint-disable-next-line @nx/enforce-module-boundaries
import FussbodenheizungSvg from '@/assets/Fussbodenheizung.jpeg';
// eslint-disable-next-line @nx/enforce-module-boundaries
import HeizkörperSvg from '@/assets/Heizkörper.jpeg';
// eslint-disable-next-line @nx/enforce-module-boundaries
import HeizkörperUndFussbodenheizungSvg from '@/assets/HeizkörperUndFussbodenheizung.png';
import { setCurrentView, setTypeOfHeating } from './../composables';

const store = useLeadStore();

const items = [
  'Fußbodenheizung',
  'Heizkörper',
  'Heizkörper + Fußbodenheizung',
];

const svgMap: Record<string, string> = {
  Fußbodenheizung: FussbodenheizungSvg,
  Heizkörper: HeizkörperSvg,
  'Heizkörper + Fußbodenheizung': HeizkörperUndFussbodenheizungSvg,
};

function selectedBuilding(item: string) {
  setTypeOfHeating(item);
  if(item === 'Fußbodenheizung') {
    setCurrentView('underFloorHeating');
    return;
  }
  setCurrentView('heaterLocation');
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

<style scoped>
.building-container {
  display: flex;
  column-gap: inherit;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
