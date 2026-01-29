<script setup lang="ts">
import { setCurrentView, setInstallationLocationCeilingHeight, setNotApplicableDetails } from './../composables';
// eslint-disable-next-line @nx/enforce-module-boundaries
import FlurhoheSVG from '@/assets/Flurhohe.avif';

const items = ['niedriger als 180 cm', '180 - 199 cm', 'höher als 199 cm'];

function selectHeight(item: string) {
  setInstallationLocationCeilingHeight(item);
  if (item === 'niedriger als 180 cm') {
    setNotApplicableDetails('HeatingRoomHeight');
    setCurrentView('notApplicable');
    return;
  }
  // set into the state
  setCurrentView('heatingRoomWidth');
}
</script>

<template>
  <p class="title">
    Welche Höhe hat dein Heizungsraum?
  </p>
  <img
    :src="FlurhoheSVG"
    alt="Building type image"
    style="width: 500px;"
  >
  <div class="list-container">
    <div
      v-for="item in items"
      :key="item"
      class="list-item"
      @click="selectHeight(item)"
    >
      {{ item }}
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
