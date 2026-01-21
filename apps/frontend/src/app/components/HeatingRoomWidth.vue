<script setup lang="ts">
import { useLeadStore } from './../../stores/leadStore';
import { useRouter } from 'vue-router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import FlurbreadthSVG from '@/assets/Flurbreadth.avif';

const router = useRouter();

const store = useLeadStore();

const items = ['Ja', 'Nein'];

function selectType(item: string) {
  // set into the state
  store.setCurrentView('heatingRoomEntranceHeight');
}
</script>

<template>
  <p>
    Ist der Laufweg zu deinem Heizungsraum an jeder Stelle mindestens 65cm breit?
  </p>
  <div class="list-container">
    <img :src="FlurbreadthSVG" alt="Building type image" style="width: 500px;" />
    <p>Hinweis: Unser Team benötigt einen Laufweg mit einer durchgehenden Breite von mindestens 65 cm für die Installation der größeren Komponenten wie den Wasserspeichern.</p>
  </div>
  <div class="list-container">
    <div class="list-item" v-for="item in items" :key="item" @click="selectType(item)">
      {{ item  }}
    </div>
  </div>
</template>

<style scoped>
.list-container {
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
