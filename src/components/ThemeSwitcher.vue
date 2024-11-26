<!-- src/components/ThemeSwitcher.vue -->

<template>
  <button @click="toggleTheme">
    {{ themeValue >= 0.5 ? "День" : "Ночь" }}
  </button>
</template>

<script setup>
import { useTheme } from "../composables/useTheme";

// Получаем themeValue и toggleTheme из composable
const { themeValue, toggleTheme } = useTheme();
</script>

<style scoped>
button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 5px;
}

button:hover {
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
