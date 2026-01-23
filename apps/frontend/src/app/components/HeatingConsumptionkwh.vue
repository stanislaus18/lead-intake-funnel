<script setup lang="ts">
import { ref } from 'vue';
import { useLeadStore } from './../../stores/leadStore';
import { setCurrentView, setHeatingConsumption } from './../composables';

const store = useLeadStore();

const consumption = ref('');
const errors = ref({
  totalArea: false,
  heatedArea: false,
});

function validateAndNextPage() {
  // Reset errors
  errors.value = {
    consumption: false,
  };

  // Validate fields
  const consumptionValue = parseFloat(consumption.value);

  let isValid = true;
  if (!consumption.value || consumptionValue <= 0) {
    errors.value.consumption = true;
    isValid = false;
  }

  // Only proceed if both fields are valid
  if (isValid) {
    // Save values to store if needed
    setHeatingConsumption(consumptionValue, 'Kilowattstunden (kWh)');
    // set into the state
    setCurrentView('heatingYears');
  }
}

defineExpose({
  validateAndNextPage,
});
</script>

<template>
  <div class="container">
    <p class="title">Bitte gib deinen aktuellen Jahresverbrauch in kWh an</p>
    <p class="description">
      Den Verbrauch findest du z.B. auf den Rechnungen deines Energieversorgers.
    </p>
    <div class="form-group">
      <p class="label">Jahresverbrauch in kWh</p>

       <input
        v-model="consumption"
        type="number"
        placeholder="Jahresverbrauch in kWh eingeben"
        :class="['input', { 'input-error': errors.consumption }]"
      />
      <p v-if="errors.consumption" class="error-message">Dieses Feld ist erforderlich</p>
     </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.description {
  margin-bottom: 1.5rem;
  color: #4b5563;
  line-height: 1.6;
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
