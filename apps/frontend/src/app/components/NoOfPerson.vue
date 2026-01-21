<script setup lang="ts">
import { useLeadStore } from './../../stores/leadStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useLeadStore();

const items = [1, 2, 3, 4, 5, 6, 7, 8,9];

function selectUnit(item: number) {
  // set into the state
  store.setResidentialUnit(item);
  store.setCurrentView('heatingFuel');
}
</script>

<template>
  <p>
    Wie viele Wohneinheiten befinden sich in deinem Gebäude? Die Anzahl der
    Wohneinheiten ist wichtig für eine genaue Kostenermittlung und die
    Abschätzung deiner Förderhöhe. Bitte wähle eine Option
  </p>
  <div class="list-container">
    <div class="list-item" v-for="item in items" :key="item" @click="selectUnit(item)">
      {{ item === 9 ? 'Mehr als 8' : item }}
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
