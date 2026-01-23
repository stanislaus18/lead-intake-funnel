<script setup lang="ts">
import { useLeadStore } from './../../stores/leadStore';
import { setInstallationTimeline, setCurrentView } from './../composables';

const store = useLeadStore();

const items = ['Sobald wie möglich', '3 - 6 Monate', '6-12 Monate', '12 - 24 Monate', 'Mehr als 24 Monate'];

function selectUnit(item: string) {
  // set into the state
  setInstallationTimeline(item);
  setCurrentView('personsInfo');
}
</script>

<template>
  <p class="title">
    Ab wann willst du ultra-effizient heizen?
  </p>
  <div class="list-container">
    <div class="list-item" v-for="item in items" :key="item" @click="selectUnit(item)">
      {{ item }}
    </div>
  </div>
</template>

<style scoped>
.list-container {
  width: 600px;
  margin: 40px auto; /* center horizontally */
  display: flex;
  flex-direction: column;
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
  background-color: black;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

</style>
