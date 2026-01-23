<script setup lang="ts">
import { useLeadStore } from './../../stores/leadStore';

const store = useLeadStore();

const items = ['Ja', 'Nein'];

function itemClicked(item: string) {
  if (item === 'Ja') {
    store.setCurrentView('residentialUnit');
  } else {
    store.setCurrentView('otherBuildingTypes');
  }
}
</script>``

<template>
  <p class="title">
    Liegt die Wohnung im EG und besitzt ein eigenes Heizsystem (Gasetagenheizung
    o.ä.)?
  </p>
  <p class="description">Bitte wähle eine Option</p>
  <div class="list-container">
    <div
      class="list-item"
      v-for="item in items"
      :key="item"
      @click="itemClicked(item)"
    >
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
  border: 1px solid #000;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.list-item:hover {
  background-color: #000;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(f, f, f, 0.1);
}
</style>
