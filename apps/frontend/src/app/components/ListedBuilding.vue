<script setup lang="ts">
import { useLeadStore } from './../../stores/leadStore';
import { setCurrentView, setHeritageProtection } from './../composables';
// eslint-disable-next-line @nx/enforce-module-boundaries
import NoSvg from '@/assets/No.svg';
// eslint-disable-next-line @nx/enforce-module-boundaries
import YesSvg from '@/assets/Yes.svg';

const store = useLeadStore();

function userClicked(item: string) {
  setHeritageProtection(item);
  // set into the state
  if (item === 'Ja') {
    setCurrentView('notApplicableHeatingHeritage');
    return;
  }
  setCurrentView('householdIncome');
}
</script>

<template>
  <p class="title">Steht dein Haus unter Denkmalschutz?</p>
  <div class="list-container">
    <div class="button-container">
      <button class="box btn-item" @click="userClicked('Ja')">
        <img :src="YesSvg" alt="Building type image" />
        <p>Ja</p>
      </button>
      <button class="box btn-item" @click="userClicked('Nein')">
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
