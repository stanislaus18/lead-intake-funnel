<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function yes() {
   router.push('/residentialUnit');
}

function no() {
   router.push('/otherBuildingTypes');
}
</script>

<template>
  <p>
    Liegt die Wohnung im EG und besitzt ein eigenes Heizsystem (Gasetagenheizung
    o.ä.)? Bitte wähle eine Option
  </p>
  <div class="list-container">
    <button @click="yes()">Ja</button>
    <button @click="no()">Nein</button>
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
