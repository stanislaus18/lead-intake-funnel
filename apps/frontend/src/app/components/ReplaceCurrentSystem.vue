<script setup lang="ts">
// eslint-disable-next-line @nx/enforce-module-boundaries
import NoSvg from '@/assets/No.svg';
// eslint-disable-next-line @nx/enforce-module-boundaries
import YesSvg from '@/assets/Yes.svg';

import { setCurrentView, setFullReplacementOfHeatingSystemPlanned } from './../composables';

function onClicked(answer: string) {
  setFullReplacementOfHeatingSystemPlanned(answer);
  if (answer === 'yes') {
    setCurrentView('heatingDetails');
  } else {
    setCurrentView('notApplicableHeating');
  }
}
</script>

<template>
  <p class="title">Soll die aktuelle Heizungsanlage komplett ersetzt werden?</p>
  <div class="list-container">
    <div class="button-container">
      <button class="box btn-item" @click="onClicked('yes')">
        <img :src="YesSvg" alt="Building type image" />
        <p>Ja</p>
      </button>
      <button class="box btn-item" @click="onClicked('no')">
        <img :src="NoSvg" alt="Building type image" />
        <p>Nein</p>
      </button>
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

.btn-item {
  width: 280px;
  border-radius: 10px;
}
</style>
