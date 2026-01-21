<script setup lang="ts">
import { useLeadStore } from './../../stores/leadStore';
import { useRouter } from 'vue-router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import FussbodenheizungSvg from '@/assets/Fussbodenheizung.jpeg';
// eslint-disable-next-line @nx/enforce-module-boundaries
import HeizkörperSvg from '@/assets/Heizkörper.jpeg';
// eslint-disable-next-line @nx/enforce-module-boundaries
import HeizkörperUndFussbodenheizungSvg from '@/assets/HeizkörperUndFussbodenheizung.png';
const store = useLeadStore();
const router = useRouter();

const items = [
  'Fussbodenheizung',
  'Heizkörper',
  'Heizkörper und Fussbodenheizung',
];

const svgMap: Record<string, string> = {
  'Fussbodenheizung': FussbodenheizungSvg,
  'Heizkörper': HeizkörperSvg,
  'Heizkörper und Fussbodenheizung': HeizkörperUndFussbodenheizungSvg,
};

function selectedBuilding(item: string) {  
   store.setCurrentView('underFloorHeating');
}
</script>

<template>
  <p>In was für einem Gebäude wohnst du?</p>
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

<style scoped>
.building-container {
  display: flex;
  column-gap: inherit;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
