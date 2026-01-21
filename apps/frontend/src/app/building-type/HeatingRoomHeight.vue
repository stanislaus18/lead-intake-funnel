<script setup lang="ts">
import { useLeadStore } from './../../stores/leadStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useLeadStore();

const items = ['niedrig als 180cm', '180cm', 'hoher als 199cm'];

function selectGasType(item: string) {
  // set into the state
  store.setCurrentView('ownUse');
}
</script>

<template>
  <p>
    Welche Höhe hat dein Heizungsraum?
  </p>
  <div class="list-container">
    <div v-for="item in items" :key="item" @click="selectGasType(item)">
      {{ item  }}
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
