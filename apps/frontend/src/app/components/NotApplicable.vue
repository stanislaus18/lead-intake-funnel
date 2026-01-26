<script setup lang="ts">
import { getNotApplicableDetails, setCurrentView } from '../composables';
const { title, description } = getNotApplicableDetails();

function validateAndNextPage() {
  setCurrentView('personsInfo');
}

defineExpose({
  validateAndNextPage,
});
</script>

<template>
  <p class="title">
    {{ title }}
  </p>
  <p class="description">
    {{ description }}
  </p>
</template>

<style scoped></style>
