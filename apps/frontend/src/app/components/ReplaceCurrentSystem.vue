<script setup lang="ts">
import { useRouter } from 'vue-router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import NoSvg from '@/assets/No.svg';
// eslint-disable-next-line @nx/enforce-module-boundaries
import YesSvg from '@/assets/Yes.svg';

import { useLeadStore } from './../../stores/leadStore';
const store = useLeadStore();

const router = useRouter();


function userClickedYes(answer: string) {
   store.setCurrentView('heatingDetails');
}

function userClickedNo(answer: string) {
   store.setCurrentView('otherBuildingTypes');
}

</script>

<template>
  <p>
    Soll die aktuelle Heizungsanlage komplett ersetzt werden?
  </p>
  <div class="list-container">
      <div class="button-container">
    <button class="box" @click="userClickedYes('yes')"><img :src="YesSvg" alt="Building type image" />
      <p>Ja</p></button>
    <button class="box" @click="userClickedNo('no')"><img :src="NoSvg" alt="Building type image" />
      <p>Nein</p></button>
  </div>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  column-gap: inherit;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
}

.list-item {
  padding: 16px 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.list-item:hover {
  background-color: #f5f5f5;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
