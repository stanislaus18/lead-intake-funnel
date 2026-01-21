<script setup lang="ts">
import { useLeadStore } from './../../stores/leadStore';
import { useRouter } from 'vue-router';

const store = useLeadStore();
const router = useRouter();

const items = [
  '0-9 Jahre',
  '10-19 Jahre',
  '20+ Jahre',
];

function selectedBuilding(item: string) {  
   store.setCurrentView('residentialUnit');
}
</script>

<template>
  <p>In was für einem Gebäude wohnst du?</p>
  <div class="container">
    <div
      v-for="item in items"
      :key="item"
      class="box"
      @click="selectedBuilding(item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 16px;
  box-sizing: border-box;
}

.box {
  width: 200px;
  height: 200px;
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
}

/* Mobile friendly: stack nicely */
@media (max-width: 480px) {
  .box {
    width: 100%;
    max-width: 200px;
  }
}
</style>
