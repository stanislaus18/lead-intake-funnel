<script setup lang="ts">
import { ref } from 'vue';

interface ImageItem {
  file: File;
  preview: string;
}

interface Props {
  imageType: string;
  label: string;
  imagePreviews: ImageItem[];
  isUploading?: boolean;
}

interface Emits {
  (e: 'image-change', event: Event, files: File[]): void;
  (e: 'image-remove', index: number): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <div class="image-upload-wrapper">
    <label
      :for="`image-${imageType}`"
      :class="`label-${imageType}`"
    >
      {{ label }}
    </label>
    <input
      :id="`image-${imageType}`"
      type="file"
      multiple
      accept="image/*"
      :class="`image-${imageType}`"
      @change="
        $emit(
          'image-change',
          $event,
          Array.from(($event.target as HTMLInputElement).files || [])
        )
      "
    >

    <!-- Image Previews -->
    <div
      v-if="imagePreviews.length > 0"
      class="image-previews-container"
    >
      <div
        v-for="(item, index) in imagePreviews"
        :key="index"
        class="image-preview-wrapper"
      >
        <img
          :src="item.preview"
          alt="Preview"
          class="image-preview"
        >
        <button
          type="button"
          class="btn-remove-image"
          :disabled="isUploading"
          @click="$emit('image-remove', index)"
        >
          ✕ Entfernen
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Image Upload Styles */
.image-upload-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

[class^="label-"] {
  font-weight: 600;
  font-size: 1rem;
  color: #374151;
}

[class^="image-"] {
  padding: 12px;
  border: 2px dashed #3b82f6;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #f0f9ff;
}

[class^="image-"]:hover {
  border-color: #1e40af;
  background-color: #e0f2fe;
}

[class^="image-"]:focus {
  outline: none;
  border-color: #1e40af;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.image-previews-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
}

.image-preview-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.image-preview {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
}

.btn-remove-image {
  padding: 0.5rem 1rem;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.btn-remove-image:hover:not(:disabled) {
  background-color: #b91c1c;
  transform: translateY(-1px);
}

.btn-remove-image:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
