<script setup lang="ts">
import { setCurrentView } from './../composables';
function validateAndNextPage() {
  setCurrentView('personsInfo');
}

defineExpose({
  validateAndNextPage,
});
</script>
<template>
  <p class="title">
    Aktuell nur bei vollständiger Erneuerung des Heizsystems verfügbar
  </p>
  <p class="description">
    Vielen Dank für dein Interesse! Leider können wir unser Angebot derzeit nur
    für Gebäude anbieten, bei denen das Heizsystem komplett erneuert werden
    kann. Da wir aktuell keine oder Teilerneuerungen anbieten, ist eine
    vollständige Erneuerung Voraussetzung. Wenn du möchtest, kannst du dich
    gerne in unsere Warteliste eintragen, indem du auf "Weiter" klickst. Wir
    informieren dich umgehend, sobald sich etwas ändert. Vielen Dank für dein
    Verständnis!
  </p>
</template>

<style scoped></style>
