<script setup lang="ts">
import { useRouter } from 'vue-router';

import { useLeadStore } from './../../stores/leadStore';
const store = useLeadStore();

const router = useRouter();

function useClicked(answer: string) {
   store.setCurrentView('replaceCurrentSystem');
}

</script>

<template>
  <p>
    Nutzt du zumindest eine Wohneinheit in deinem Gebäude selbst?
  </p>
  <div class="list-container">
    <button @click="useClicked('yes')">Ja</button>
    <button @click="useClicked('no')">Nein</button>
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
