<script setup lang="ts">
import { useLeadStore } from './../../stores/leadStore';
import { useRouter } from 'vue-router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import FlurhoheSVG from '@/assets/Flurhohe.avif';

const router = useRouter();

const store = useLeadStore();

const items = ['niedrig als 180cm', '180cm', 'hoher als 199cm'];

function selectType(item: string) {
  // set into the state
  store.setCurrentView('heatingRoomWidth');
}
</script>

<template>
  <p>
    Welche Höhe hat dein Heizungsraum?
  </p>
<img :src="FlurhoheSVG" alt="Building type image" style="width: 500px;" />
  <div class="list-container">
    <div class="list-item" v-for="item in items" :key="item" @click="selectType(item)">
      {{ item  }}
    </div>
  </div>
</template>

<style scoped>
.list-container {
  width: 600px;
  margin: 40px auto; /* center horizontally */
  display: flex;
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
