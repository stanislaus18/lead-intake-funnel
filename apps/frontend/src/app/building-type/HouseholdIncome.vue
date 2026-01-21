<script setup lang="ts">
import { useLeadStore } from './../../stores/leadStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useLeadStore();

const items = ['Unter 40.000€ (Brutto)', 'Über 40.000€ (Brutto)', 'Keine Antwort'];

function selectUnit(item: number) {
  // set into the state
  store.setResidentialUnit(item);
  store.setCurrentView('ownUse');
}
</script>

<template>
  <p>
    Wie hoch liegt dein Haushaltsjahreseinkommen?
  </p>
  <div class="list-container">
    <div v-for="item in items" :key="item" @click="selectUnit(item)">
      {{ item === 7 ? 'Mehr als 6' : item }}
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
