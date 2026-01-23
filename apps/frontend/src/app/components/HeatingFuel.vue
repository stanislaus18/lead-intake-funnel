<script setup lang="ts">
import { useLeadStore } from './../../stores/leadStore';
import { setCurrentView, setHeatingFuel } from './../composables';
const store = useLeadStore();

const items = ['Erdgas', 'Öl', 'Fernwärme', 'Pelletheizung', 'Sonstige'];

function selectGasType(item: string) {
  setHeatingFuel(item);
  if(item === 'Erdgas' || item === 'Sonstige') {
    setCurrentView('HeatingConsumptionkwh');
  } else if(item === 'Öl' || item === 'Fernwärme') {
    setCurrentView('HeatingConsumptionLiter');
  } else if(item === 'Pelletheizung') {
    setCurrentView('HeatingConsumptionKilogram');
  }
  // set into the state
}
</script>

<template>
  <p class="title">
    Womit heizt du aktuell?
    Bitte wähle eine Option
  </p>
  <div class="list-container">
    <div class="list-item" v-for="item in items" :key="item" @click="selectGasType(item)">
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
  background-color: #f5f5f5;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

</style>
