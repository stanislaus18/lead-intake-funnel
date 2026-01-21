<script setup lang="ts">
import { useLeadStore } from './../../stores/leadStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useLeadStore();

function nextPage() {
  // set into the state
  store.setCurrentView('noOfPerson');
}
</script>

<template>
  <div class="container">
    <p class="title">Beheizte und beheizbare Fläche</p>
    <p class="description">
      Damit wir deine neue Wärmepumpe optimal auslegen können, benötigen wir die
      Fläche aller Räume, die über einen funktionsfähigen Heizkörper und / oder
      Fußbodenheizung verfügen, unabhängig von aktueller Nutzung oder
      Heizbetrieb.
    </p>
    <div class="form-group">
      <p class="label">
        Wie groß ist die gesamte beheizbare Fläche deines Gebäudes (in m²)?
      </p>
      <input type="number" placeholder="Fläche in m² eingeben" class="input" />
    </div>
    <div class="form-group">
      <p class="label">
        Wie viele Quadratmeter davon werden tatsächlich beheizt?
      </p>
      <input type="number" placeholder="Fläche in m² eingeben" class="input" />
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
