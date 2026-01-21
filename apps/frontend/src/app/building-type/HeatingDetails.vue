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
  <p>
    Beheizte und beheizbare Fläche
Damit wir deine neue Wärmepumpe optimal auslegen können, benötigen wir die Fläche aller Räume, die über einen funktionsfähigen Heizkörper und / oder Fußbodenheizung verfügen, unabhängig von aktueller Nutzung oder Heizbetrieb.
  </p>
  <div>
    <p>Wie groß ist die gesamte beheizbare Fläche deines Gebäudes (in m²)?</p>
    <input type="number" placeholder="Fläche in m² eingeben" />
  </div>
    <div>
         <p>Wie viele Quadratmeter davon werden tatsächlich beheizt?</p>
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
