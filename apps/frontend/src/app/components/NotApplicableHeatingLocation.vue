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
    Aktuell keine Angebote für Heizungen im Ober- oder Dachgeschoss verfügbar
  </p>
  <p class="description">
    Vielen Dank für dein Interesse! Leider können wir unser Angebot derzeit
    nicht für Gebäude anbieten, bei denen die Heizung im Ober- oder Dachgeschoss
    installiert ist. Aufgrund technischer Einschränkungen ist dies momentan
    nicht möglich. Wenn du möchtest, kannst du dich gerne in unsere Warteliste
    eintragen, indem du auf "Weiter" klickst. Wir informieren dich umgehend,
    sobald sich etwas ändert. Vielen Dank für dein Verständnis!
  </p>
</template>

<style scoped></style>
