<script setup lang="ts">
import { ref } from 'vue';
import { useLeadStore } from './../../stores/leadStore';
import { setBuildingLivingSpace, setHeatedArea, setCurrentView } from './../composables';

const store = useLeadStore();

const totalArea = ref('');
const heatedArea = ref('');
const errors = ref({
  totalArea: false,
  heatedArea: false,
});

function validateAndNextPage() {
  // Reset errors
  errors.value = {
    totalArea: false,
    heatedArea: false,
  };

  // Validate fields
  const totalAreaValue = parseFloat(totalArea.value);
  const heatedAreaValue = parseFloat(heatedArea.value);

  let isValid = true;

  if (!totalArea.value || totalAreaValue <= 0) {
    errors.value.totalArea = true;
    isValid = false;
  }

  if (!heatedArea.value || heatedAreaValue <= 0) {
    errors.value.heatedArea = true;
    isValid = false;
  }

  // Only proceed if both fields are valid
  if (isValid) {
    // Save values to store if needed
    setBuildingLivingSpace(totalAreaValue);
    setHeatedArea(heatedAreaValue);
    setCurrentView('noOfPerson');
  }
}

defineExpose({
  validateAndNextPage,
});
</script>

<template>
  <div class="container">
    <p class="title">Beheizte und beheizbare Fläche</p>
    <p class="description">
      Damit wir deine neue Wärmepumpe optimal auslegen können, benötigen wir die
      Fläche aller Räume, die über einen funktionsfähigen Heizkörper und / oder
      Fußbodenheizung verfügen, unabhängig von aktueller Nutzung oder
      Heizbetrieb.
    </p>
    <div class="form-group">
      <p class="label">
        Wie groß ist die gesamte beheizbare Fläche deines Gebäudes (in m²)?
      </p>
      <input
        v-model="totalArea"
        type="number"
        placeholder="Fläche in m² eingeben"
        :class="['input', { 'input-error': errors.totalArea }]"
      />
      <p v-if="errors.totalArea" class="error-message">Dieses Feld ist erforderlich</p>
    </div>
    <div class="form-group">
      <p class="label">
        Wie viele Quadratmeter davon werden tatsächlich beheizt?
      </p>
      <input
        v-model="heatedArea"
        type="number"
        placeholder="Fläche in m² eingeben"
        :class="['input', { 'input-error': errors.heatedArea }]"
      />
      <p v-if="errors.heatedArea" class="error-message">Dieses Feld ist erforderlich</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.label {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.input:focus {
  outline: none;
  ring: 2px;
  ring-color: #3b82f6;
}

.input-error {
  border-color: #dc2626;
  background-color: #fee2e2;
}

.input-error:focus {
  ring-color: #dc2626;
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
