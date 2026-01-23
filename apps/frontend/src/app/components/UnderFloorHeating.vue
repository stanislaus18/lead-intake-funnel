<script setup lang="ts">
import { useLeadStore } from './../../stores/leadStore';
import { useRouter } from 'vue-router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import NoSvg from '@/assets/No.svg';
// eslint-disable-next-line @nx/enforce-module-boundaries
import YesSvg from '@/assets/Yes.svg';

const router = useRouter();

const store = useLeadStore();

function useClicked(item: string) {
  // set into the state
  store.setCurrentView('heaterLocation');
}
</script>

<template>
  <p class="title">
    Womit heizt du aktuell?Ist deine Fußbodenheizung vor 1990 verlegt worden?
  </p>
  <div class="button-container">
    <button class="box" @click="useClicked('yes')">
      <img :src="YesSvg" alt="Building type image" />
      <p>Ja</p>
    </button>
    <button class="box" @click="useClicked('no')">
      <img :src="NoSvg" alt="Building type image" />
      <p>Nein</p>
    </button>
    <button class="box" @click="useClicked('NA')">
      <img :src="NoSvg" alt="Building type image" />
      <p>Weiss ich nicht</p>
    </button>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  column-gap: inherit;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
