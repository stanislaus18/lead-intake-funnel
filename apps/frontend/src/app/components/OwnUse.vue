<script setup lang="ts">
import { setCurrentView, setOwnerOccupiedHousing } from './../composables';
// eslint-disable-next-line @nx/enforce-module-boundaries
import NoSvg from '@/assets/No.svg';
// eslint-disable-next-line @nx/enforce-module-boundaries
import YesSvg from '@/assets/Yes.svg';

function useClicked(answer: boolean) {
  setCurrentView('replaceCurrentSystem');
  setOwnerOccupiedHousing(answer);
}
</script>

<template>
  <p class="title">
    Nutzt du zumindest eine Wohneinheit in deinem Gebäude selbst?
  </p>
  <div class="button-container">
    <button
      class="box btn-item"
      @click="useClicked(true)"
    >
      <img
        :src="YesSvg"
        alt="Building type image"
      >
      <p>Ja</p>
    </button>
    <button
      class="box btn-item"
      @click="useClicked(false)"
    >
      <img
        :src="NoSvg"
        alt="Building type image"
      >
      <p>Nein</p>
    </button>
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

.btn-item {
  width: 280px;
  border-radius: 10px;
}
</style>
