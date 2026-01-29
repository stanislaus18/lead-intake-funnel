<script setup lang="ts">
import { setCurrentView, setBoilerRoomSize, setNotApplicableDetails } from './../composables';
// eslint-disable-next-line @nx/enforce-module-boundaries
import FlurplanSvg from '@/assets/Flurplan.avif';


const items = ['weniger als 4 qm', 'mehr als 4 qm'];

function selectType(item: string) {
  if (item === 'weniger als 4 qm') {
    setNotApplicableDetails('HeatingRoomFloor');
    setCurrentView('notApplicable');
    return;
  }
  setBoilerRoomSize(item);
  // set into the state
  setCurrentView('heatingRoomHeight');
}
</script>

<template>
  <p class="title">
    How large is the usable area for the heating system in your boiler room?
  </p>
  <img
    :src="FlurplanSvg"
    alt="Building type image"
    style="width: 500px;"
  >
  <div class="list-container">
    <div
      v-for="item in items"
      :key="item"
      class="list-item"
      @click="selectType(item)"
    >
      <p>{{ item }}</p>
    </div>
  </div>
</template>

<style scoped>
.list-container {
  width: 600px;
  margin: 40px auto;
  /* center horizontally */
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
