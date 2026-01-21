<script setup lang="ts">
import { useLeadStore } from './../../stores/leadStore';
import { useRouter } from 'vue-router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import NoSvg from '@/assets/No.svg';
// eslint-disable-next-line @nx/enforce-module-boundaries
import YesSvg from '@/assets/Yes.svg';

const router = useRouter();

const store = useLeadStore();

const items = ['Ja', 'Nein'];

function userClicked(item: string) {
  // set into the state
  store.setCurrentView('householdIncome');
}
</script>

<template>
  <p>
    Steht dein Haus unter Denkmalschutz?
  </p>
  <div class="list-container">
      <div class="button-container">
    <button class="box" @click="userClicked('yes')"><img :src="YesSvg" alt="Building type image" />
      <p>Ja</p></button>
    <button class="box" @click="userClicked('no')"><img :src="NoSvg" alt="Building type image" />
      <p>Nein</p></button>
  </div>
  </div>
</template>

<style scoped>
.button-container {
  width: 600px;
  margin: 40px auto; /* center horizontally */
  display: flex;
  gap: 12px;
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
