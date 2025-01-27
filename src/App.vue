<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from "vue-router";
import { useTheme } from './hooks/useTheme';

const { initTheme } = useTheme();

onMounted(() => {
  initTheme();
});
</script>

<template>
  <div class="app-container">
    <RouterView />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #f8f8f8;
}

header {
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

nav {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 24px;
}

nav a {
  color: #333;
  text-decoration: none;
  font-size: 16px;
  padding: 4px 0;
  position: relative;
}

nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #4b5cc4;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

nav a:hover::after {
  transform: scaleX(1);
}

nav a.router-link-active {
  color: #4b5cc4;
  font-weight: 500;
}

nav a.router-link-active::after {
  transform: scaleX(1);
}
</style>
