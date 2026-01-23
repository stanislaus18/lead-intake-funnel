<script setup lang="ts">
import { useLeadStore } from './../../stores/leadStore';
import { setCurrentView, setHouseholdIncome } from './../composables';
const store = useLeadStore();

const items = [{ key: 'Unter 40.000€ (Brutto)', value: 'less_than_40k_gross' }, { key: 'Über 40.000€ (Brutto)', value: 'more_than_40k_gross' }, { key: 'Keine Antwort', value: 'no_answer' }];

function selectUnit(item: { key: string; value: string }) {
  // set into the state
  setHouseholdIncome(item.value);
  setCurrentView('installation');
}
</script>

<template>
  <p class="title">
    Wie hoch liegt dein Haushaltsjahreseinkommen?
  </p>
  <div class="list-container">
    <div class="list-item" v-for="item in items" :key="item.key" @click="selectUnit(item)">
      {{ item.key }}
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
  background-color: black;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

</style>
