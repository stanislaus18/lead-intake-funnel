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
    Leider kein Angebot möglich wegen des zu schmalen Laufwegs
  </p>
  <p class="description">
    Vielen Dank für dein Interesse an unserem Service! Leider können wir dir
    kein Angebot erstellen, da wir sicherstellen müssen, dass alle benötigten
    Komponenten sicher in den Heizungsraum gebracht werden können, ohne Schäden
    im Gebäude zu verursachen. Trage dich gerne in unsere Warteliste ein, damit
    wir dich informieren können, sobald sich die technischen Anforderungen
    entsprechend verändert haben. Klicke dazu einfach auf „Weiter”. Wir freuen
    uns auf die mögliche künftige Zusammenarbeit!
  </p>
</template>

<style scoped></style>
