<script setup lang="ts">
import { useLeadStore } from './../../stores/leadStore';
import { setHeatingLocation, setCurrentView } from './../composables';

const store = useLeadStore();

  const items = [{label: 'Keller', value: 'Im Keller'}, {label: 'Erdgeschoss', value: 'Im EG'}, {label: 'Obergeschoss', value: 'Obergeschoss'}, {label: 'Dachgeschoss', value: 'Dachgeschoss'}];

function selectUnit(item: string) {
  // set into the state
  if(item.label === 'Obergeschoss' || item.label === 'Dachgeschoss') {
     setHeatingLocation(item.value);
    setCurrentView('notApplicableHeatingLocation');
    return;
  }
  setHeatingLocation(item.value);
  setCurrentView('heatingRoomFloor');
}
</script>

<template>
  <p class="title">
    Auf welcher Etage befindet sich dein derzeitiger Heizungsraum?
  </p>
  <div class="list-container">
    <div class="list-item" v-for="item in items" :key="item.label" @click="selectUnit(item)">
      {{ item.label }}
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
