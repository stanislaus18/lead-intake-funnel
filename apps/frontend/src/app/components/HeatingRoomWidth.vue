<script setup lang="ts">
import { useLeadStore } from './../../stores/leadStore';
import { setCurrentView, setNotApplicableDetails, setWidthPathway } from './../composables';
// eslint-disable-next-line @nx/enforce-module-boundaries
import FlurbreadthSVG from '@/assets/Flurbreadth.avif';

const store = useLeadStore();

const items = ['Ja', 'Nein'];

function selectAnswer(item: string) {
  setWidthPathway(item);
  if (item === 'Nein') {
    setNotApplicableDetails('HeatingRoomWidth');
    setCurrentView('notApplicable');
    return;
  }
  // set into the state
  setCurrentView('heatingRoomEntranceHeight');
}
</script>

<template>
  <p class="title">
    Ist der Laufweg zu deinem Heizungsraum an jeder Stelle mindestens 65cm breit?
  </p>
  <div class="list-container">
    <img
      :src="FlurbreadthSVG"
      alt="Building type image"
      style="width: 200px;"
    >
    <p>
      <b>Hinweis:</b> Unser Team benötigt einen Laufweg mit einer durchgehenden Breite von mindestens 65 cm für die
      Installation der größeren Komponenten wie den Wasserspeichern.
    </p>
  </div>
  <div class="list-container">
    <div
      v-for="item in items"
      :key="item"
      class="list-item"
      @click="selectAnswer(item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<style scoped>
.list-container {
  place-content: center;
  width: 600px;
  margin: 40px auto;
  /* center horizontally */
  display: flex;
  gap: 12px;
}

.list-item {
  padding: 16px 70px;
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
