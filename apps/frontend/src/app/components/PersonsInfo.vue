<script setup lang="ts">
import { ref } from 'vue';
import { Project, setContactInformation } from './../composables';
import { UploadDBService } from './../utility/index-db';
import ImageUpload from './ImageUpload.vue';
// eslint-disable-next-line @nx/enforce-module-boundaries
import VamoPng from '@/assets/VamoLogo.png';
import { Pictures } from '../composables/set-contact-information';
import { combineLatest, Observable, of, map, filter } from 'rxjs';

const uploadDB = new UploadDBService();
uploadDB.init$().subscribe();

const formData = ref({
  salutation: '',
  firstName: '',
  lastName: '',
  postalcode: '',
  email: '',
  phone: '',
  outdoorUnitLocation: [] as File[],
  outdoorUnitLocationWithArea: [] as File[],
  heatingRoom: [] as File[],
  meterClosetWithDoorOpen: [] as File[],
  meterClosetSlsSwitchDetailed: [] as File[],
  floorHeatingDistributionWithDoorOpen: [] as File[],
});

const errors = ref({
  salutation: false,
  firstName: false,
  lastName: false,
  postalcode: false,
  email: false,
  phone: false,
});

const imagePreviews = ref<{
  outdoorUnitLocation: { file: File; preview: string }[],
  outdoorUnitLocationWithArea: { file: File; preview: string }[],
  heatingRoom: { file: File; preview: string }[],
  meterClosetWithDoorOpen: { file: File; preview: string }[],
  meterClosetSlsSwitchDetailed: { file: File; preview: string }[],
  floorHeatingDistributionWithDoorOpen: { file: File; preview: string }[],
}>({
  outdoorUnitLocation: [],
  outdoorUnitLocationWithArea: [],
  heatingRoom: [],
  meterClosetWithDoorOpen: [],
  meterClosetSlsSwitchDetailed: [],
  floorHeatingDistributionWithDoorOpen: []
});

const isUploadingImage = ref(false);

function useClicked(pictures: Pictures) {
  setContactInformation({
    firstName: formData.value.firstName,
    lastName: formData.value.lastName,
    email: formData.value.email,
    phone: formData.value.phone,
  }, { pictures });
}

function handleImageChange(
  event: Event,
  imagefiles: File[],
  imageType: string = 'outdoorUnitLocation',
) {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files && files.length > 0) {
    Array.from(files).forEach((file) => {
      // Check if file already exists
      if (
        !(formData.value as any)[imageType].some((f: File) => f.name === file.name && f.size === file.size)
      ) {
        (formData.value as any)[imageType].push(file);

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          (imagePreviews.value as any)[imageType].push({
            file,
            preview: e.target?.result as string,
          });
        };
        reader.readAsDataURL(file);
      }
    });
    // Clear the input so the same file can be added again
    target.value = '';
  }
}

function removeImage(index: number, imageType: string = 'outdoorUnitLocation') {
  const removedFile = (imagePreviews.value as any)[imageType][index].file;
  (imagePreviews.value as any)[imageType].splice(index, 1);
  (formData.value as any)[imageType] =
    (formData.value as any)[imageType].filter(
      (f: File) => !(f.name === removedFile.name && f.size === removedFile.size),
    );
}

function uploadImages(imageType: string = 'outdoorUnitLocation'): Observable<IDBValidKey>[] {
  if ((formData.value as any)[imageType].length === 0) {
    return [of(undefined as any)];
  }

  isUploadingImage.value = true;
  const uploads: Observable<IDBValidKey>[] = (formData.value as any)[imageType].map((image: File) => uploadDB.saveImage$(image));
  console.log('Starting upload for', uploads);
  return uploads;
}

function handleSubmit() {
  // Reset errors
  errors.value = {
    salutation: false,
    firstName: false,
    lastName: false,
    postalcode: false,
    email: false,
    phone: false
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

  if (!formData.value.postalcode) {
    errors.value.postalcode = true;
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
    combineLatest([
      combineLatest(uploadImages('outdoorUnitLocation')).pipe(map(o => o.filter(id => id !== undefined))),
      combineLatest(uploadImages('outdoorUnitLocationWithArea')).pipe(map(o => o.filter(id => id !== undefined))),
      combineLatest(uploadImages('heatingRoom')).pipe(map(o => o.filter(id => id !== undefined))),
      combineLatest(uploadImages('meterClosetWithDoorOpen')).pipe(map(o => o.filter(id => id !== undefined))),
      combineLatest(uploadImages('meterClosetSlsSwitchDetailed')).pipe(map(o => o.filter(id => id !== undefined))),
      combineLatest(uploadImages('floorHeatingDistributionWithDoorOpen')).pipe(map(o => o.filter(id => id !== undefined))),
    ]).subscribe({
      next: ([
        outdoorUnitLocation,
        outdoorUnitLocationWithArea,
        heatingRoom,
        meterClosetWithDoorOpen,
        meterClosetSlsSwitchDetailed,
        floorHeatingDistributionWithDoorOpen
      ]) => {
        const pictures: Pictures = {
          outdoorUnitLocation: outdoorUnitLocation?.map(id => ({ id })) || [],
          outdoorUnitLocationWithArea: outdoorUnitLocationWithArea?.map(id => ({ id })) || [],
          heatingRoom: heatingRoom?.map(id => ({ id })) || [],
          meterClosetWithDoorOpen: meterClosetWithDoorOpen?.map(id => ({ id })) || [],
          meterClosetSlsSwitchDetailed: meterClosetSlsSwitchDetailed?.map(id => ({ id })) || [],
          floorHeatingDistributionWithDoorOpen: floorHeatingDistributionWithDoorOpen?.map(id => ({ id })) || [],
        };
        useClicked(pictures);
        console.log('All images uploaded successfully');
      },
      error: (err: Error) => {
        console.error('Error uploading images:', err);
        isUploadingImage.value = false;
      },
      complete: () => {
        isUploadingImage.value = false;
      }
    });
  }
}
</script>

<template>
  <div class="button-container">
    <img
      :src="VamoPng"
      alt="Vamo Logo"
    >
    <p class="headline">
      Jetzt Machbarkeitsprüfung abschließen! Als nächstes ermitteln wir
      gemeinsam die Details deines Angebots.
    </p>
    <div class="form-row full-width">
      <select
        v-model="formData.salutation"
        :class="['form-select', { 'input-error': errors.salutation }]"
      >
        <option value="">
          Bitte wählen
        </option>
        <option value="Herr">
          Herr
        </option>
        <option value="Frau">
          Frau
        </option>
        <option value="Divers">
          Divers
        </option>
      </select>
      <p
        v-if="errors.salutation"
        class="error-message"
      >
        Dieses Feld ist erforderlich
      </p>
    </div>
    <div class="form-row">
      <div class="input-wrapper">
        <input
          v-model="formData.firstName"
          type="text"
          placeholder="Vorname"
          :class="['form-input', { 'input-error': errors.firstName }]"
        >
        <p
          v-if="errors.firstName"
          class="error-message"
        >
          Erforderlich
        </p>
      </div>
      <div class="input-wrapper">
        <input
          v-model="formData.lastName"
          type="text"
          placeholder="Nachname"
          :class="['form-input', { 'input-error': errors.lastName }]"
        >
        <p
          v-if="errors.lastName"
          class="error-message"
        >
          Erforderlich
        </p>
      </div>
      <div class="input-wrapper">
        <input
          v-model="formData.postalcode"
          type="text"
          placeholder="Postleitzahl"
          :class="['form-input', { 'input-error': errors.postalcode }]"
        >
        <p
          v-if="errors.postalcode"
          class="error-message"
        >
          Erforderlich
        </p>
      </div>
    </div>

    <div class="form-row">
      <div class="input-wrapper">
        <input
          v-model="formData.email"
          type="email"
          placeholder="Email"
          :class="['form-input', { 'input-error': errors.email }]"
        >
        <p
          v-if="errors.email"
          class="error-message"
        >
          Erforderlich
        </p>
      </div>
      <div class="input-wrapper">
        <input
          v-model="formData.phone"
          type="tel"
          placeholder="Telefon"
          :class="['form-input', { 'input-error': errors.phone }]"
        >
        <p
          v-if="errors.phone"
          class="error-message"
        >
          Erforderlich
        </p>
      </div>
    </div>

    <h3>Weitere Details</h3>
    <div class="form-row full-width">
      <ImageUpload
        image-type="outdoorUnitLocation"
        label="Profilfoto hochladen"
        :image-previews="imagePreviews['outdoorUnitLocation']"
        :is-uploading="isUploadingImage"
        @image-change="
          (event, files) =>
            handleImageChange(event, [], 'outdoorUnitLocation')
        "
        @image-remove="(index) => removeImage(index, 'outdoorUnitLocation')"
      />
    </div>

    <div class="form-row full-width">
      <ImageUpload
        image-type="outdoorUnitLocationWithArea"
        label="Profilfoto hochladen"
        :image-previews="imagePreviews['outdoorUnitLocationWithArea']"
        :is-uploading="isUploadingImage"
        @image-change="
          (event, files) =>
            handleImageChange(event, [], 'outdoorUnitLocationWithArea')
        "
        @image-remove="(index) => removeImage(index, 'outdoorUnitLocationWithArea')"
      />
    </div>

    <div class="form-row full-width">
      <ImageUpload
        image-type="heatingRoom"
        label="Heizungsraum"
        :image-previews="imagePreviews['heatingRoom']"
        :is-uploading="isUploadingImage"
        @image-change="
          (event, files) =>
            handleImageChange(event, [], 'heatingRoom')
        "
        @image-remove="(index) => removeImage(index, 'heatingRoom')"
      />
    </div>

    <div class="form-row full-width">
      <ImageUpload
        image-type="meterClosetWithDoorOpen"
        label="Zählerschrank mit offener Tür"
        :image-previews="imagePreviews['meterClosetWithDoorOpen']"
        :is-uploading="isUploadingImage"
        @image-change="
          (event, files) =>
            handleImageChange(event, [], 'meterClosetWithDoorOpen')
        "
        @image-remove="(index) => removeImage(index, 'meterClosetWithDoorOpen')"
      />
    </div>

    <div class="form-row full-width">
      <ImageUpload
        image-type="meterClosetSlsSwitchDetailed"
        label="Zählerschrank mit SLS-Schalter (detailliert)"
        :image-previews="imagePreviews['meterClosetSlsSwitchDetailed']"
        :is-uploading="isUploadingImage"
        @image-change="
          (event, files) =>
            handleImageChange(event, [], 'meterClosetSlsSwitchDetailed')
        "
        @image-remove="(index) => removeImage(index, 'meterClosetSlsSwitchDetailed')"
      />
    </div>

    <div class="form-row full-width">
      <ImageUpload
        image-type="floorHeatingDistributionWithDoorOpen"
        label="Fußbodenheizungsverteilung mit offener Tür"
        :image-previews="imagePreviews['floorHeatingDistributionWithDoorOpen']"
        :is-uploading="isUploadingImage"
        @image-change="
          (event, files) =>
            handleImageChange(event, [], 'floorHeatingDistributionWithDoorOpen')
        "
        @image-remove="(index) => removeImage(index, 'floorHeatingDistributionWithDoorOpen')"
      />
    </div>

    <div class="form-row button-row">
      <button
        class="btn-submit"
        @click="handleSubmit"
      >
        {{
          isUploadingImage ? 'Wird hochgeladen...' : 'Jetzt Angebot Berechnen'
        }}
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

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
