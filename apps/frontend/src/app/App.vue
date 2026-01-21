<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
router.push('/');
</script>

<template>
  <div class="container max-w-7xl mx-auto px-4">
    <router-view />
  </div>
</template>
<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 16px;
  box-sizing: border-box;
}
</style>
