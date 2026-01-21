<script setup lang="ts">
import { useLeadStore } from './../../stores/leadStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useLeadStore();

const items = [1, 2, 3, 4, 5, 6, 7];

function nextPage() {
  // set into the state
  store.setCurrentView('heatingYears');
}
</script>

<template>
  <div class="container">
    <p class="title">Bitte gib deinen akuellen Jahresverbrauch in kWh an</p>
    <p class="description">
      Den Verbrauch findest du z.B. auf den Rechnungen deines Energieversorgers.
    </p>
    <div class="form-group">
      <p class="label">Jahresverbrauch in kWh</p>

      <input class="input" type="number" placeholder="Fläche in m² eingeben" />
    </div>

    <button @click="nextPage()" class="btn">Continue</button>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.description {
  margin-bottom: 1.5rem;
  color: #4b5563;
  line-height: 1.6;
}

.form-group {
  margin-bottom: 1.5rem;
}

.label {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.input:focus {
  outline: none;
  ring: 2px;
  ring-color: #3b82f6;
}

.btn {
  padding: 0.5rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #2563eb;
}
</style>
