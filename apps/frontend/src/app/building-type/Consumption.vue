<script setup lang="ts">
import { useLeadStore } from './../../stores/leadStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useLeadStore();

const items = [1, 2, 3, 4, 5, 6, 7];

function nextPage() {
  // set into the state
  store.setCurrentView('noOfPerson');
}
</script>

<template>
  <p>Bitte gib deinen akuellen Jahresverbrauch in kWh an</p>
  <p>
    Den Verbrauch findest du z.B. auf den Rechnungen deines Energieversorgers.
  </p>
  <div>
    <p>Jahresverbrauch in kWh</p>

    <input type="number" placeholder="Fläche in m² eingeben" />
  </div>

  <button @click="nextPage()">Continue</button>
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
