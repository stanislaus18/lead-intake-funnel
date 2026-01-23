<script setup lang="ts">
import { ref } from 'vue';
import { setCurrentView, setContactInformation } from './../composables';
// eslint-disable-next-line @nx/enforce-module-boundaries
import VamoPng from '@/assets/VamoLogo.png';
// eslint-disable-next-line @nx/enforce-module-boundaries
import YesSvg from '@/assets/Yes.svg';

const formData = ref({
  salutation: '',
  firstName: '',
  lastName: '',
  postCode: '',
  email: '',
  phone: '',
});

const errors = ref({
  salutation: false,
  firstName: false,
  lastName: false,
  postCode: false,
  email: false,
  phone: false,
});

function useClicked(answer: string) {
  setContactInformation({
    firstName: formData.value.firstName,
    lastName: formData.value.lastName,
    email: formData.value.email,
    phone: formData.value.phone,
  });
}

function handleSubmit() {
  // Reset errors
  errors.value = {
    salutation: false,
    firstName: false,
    lastName: false,
    postCode: false,
    email: false,
    phone: false,
  };

  let isValid = true;

  // Validate each field
  if (!formData.value.salutation) {
    errors.value.salutation = true;
    isValid = false;
  }

  if (!formData.value.firstName) {
    errors.value.firstName = true;
    isValid = false;
  }

  if (!formData.value.lastName) {
    errors.value.lastName = true;
    isValid = false;
  }

  if (!formData.value.postCode) {
    errors.value.postCode = true;
    isValid = false;
  }

  if (!formData.value.email) {
    errors.value.email = true;
    isValid = false;
  }

  if (!formData.value.phone) {
    errors.value.phone = true;
    isValid = false;
  }

  // Save form data and proceed only if valid
  if (isValid) {
    useClicked('yes');
  }
}
</script>

<template>
  <div class="button-container">
    <img :src="VamoPng" alt="Vamo Logo" />
    <p class="headline">
      Jetzt Machbarkeitsprüfung abschließen! Als nächstes ermitteln wir
      gemeinsam die Details deines Angebots.
    </p>
    <!-- Line 1: Salutation Dropdown -->
    <div class="form-row full-width">
      <select
        v-model="formData.salutation"
        :class="['form-select', { 'input-error': errors.salutation }]"
      >
        <option value="">Bitte wählen</option>
        <option value="Herr">Herr</option>
        <option value="Frau">Frau</option>
        <option value="Divers">Divers</option>
      </select>
      <p v-if="errors.salutation" class="error-message">Dieses Feld ist erforderlich</p>
    </div>

    <!-- Line 2: Vorname, Nachname, Postleitzahl -->
    <div class="form-row">
      <div class="input-wrapper">
        <input
          v-model="formData.firstName"
          type="text"
          placeholder="Vorname"
          :class="['form-input', { 'input-error': errors.firstName }]"
        />
        <p v-if="errors.firstName" class="error-message">Erforderlich</p>
      </div>
      <div class="input-wrapper">
        <input
          v-model="formData.lastName"
          type="text"
          placeholder="Nachname"
          :class="['form-input', { 'input-error': errors.lastName }]"
        />
        <p v-if="errors.lastName" class="error-message">Erforderlich</p>
      </div>
      <div class="input-wrapper">
        <input
          v-model="formData.postCode"
          type="text"
          placeholder="Postleitzahl"
          :class="['form-input', { 'input-error': errors.postCode }]"
        />
        <p v-if="errors.postCode" class="error-message">Erforderlich</p>
      </div>
    </div>

    <!-- Line 3: Email and Telefon -->
    <div class="form-row">
      <div class="input-wrapper">
        <input
          v-model="formData.email"
          type="email"
          placeholder="Email"
          :class="['form-input', { 'input-error': errors.email }]"
        />
        <p v-if="errors.email" class="error-message">Erforderlich</p>
      </div>
      <div class="input-wrapper">
        <input
          v-model="formData.phone"
          type="tel"
          placeholder="Telefon"
          :class="['form-input', { 'input-error': errors.phone }]"
        />
        <p v-if="errors.phone" class="error-message">Erforderlich</p>
      </div>
    </div>

    <!-- Button -->
    <div class="form-row button-row">
      <button @click="handleSubmit" class="btn-submit">
        Jetzt Angebot Berechnen
      </button>
    </div>
  </div>
</template>

<style scoped>
.headline {
  font-size: 40px;
  font-weight: 600;
  margin: 24px 0;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 800px;
  margin: 0 auto;
}

.form-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.form-row.full-width {
  width: 100%;
}

.form-row.button-row {
  justify-content: center;
  margin-top: 24px;
}

.input-wrapper {
  flex: 1;
  min-width: 150px;
  display: flex;
  flex-direction: column;
}

.form-select,
.form-input {
  flex: 1;
  min-width: 150px;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.2s ease;
}

.form-select {
  flex: 0 0 100%;
  min-width: unset;
}

.form-select:focus,
.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-error {
  border-color: #dc2626;
  background-color: #fee2e2;
}

.input-error:focus {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  margin-bottom: 0;
}

.btn-submit {
  padding: 0.75rem 2rem;
  background-color: #ffffff;
  border: 2px solid #000000;
  color: black;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.btn-submit:hover {
  background-color: #000000;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.btn-item {
  width: 280px;
  border-radius: 10px;
}
</style>
