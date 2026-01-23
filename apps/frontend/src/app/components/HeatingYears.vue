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

function selectedYears(item: string) {  
   store.setCurrentView('heatingTypeForRoom');
}
</script>

<template>
  <p class="title">In was für einem Gebäude wohnst du?</p>
  <div class="year-container">
    <div
      v-for="item in items"
      :key="item"
      class="box"
      @click="selectedYears(item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<style scoped>
.year-container {
  display: flex;
  flex-wrap: wrap;
    gap: 16px;
}
</style>
