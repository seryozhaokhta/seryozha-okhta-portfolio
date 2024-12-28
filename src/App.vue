<!-- src/App.vue -->

<template>
  <div class="app">
    <header class="app__header">
      <AppHeader />
    </header>
    <main class="app__main-content">
      <router-view />
    </main>
    <footer class="app__footer">
      <AppFooter />
    </footer>
  </div>
</template>

<script setup>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import { computed, watch } from "vue";
import { useTheme } from "@/composables/useTheme";

const { themeValue } = useTheme();

/**
 * Если themeValue >= 0.5 => добавляем "night-theme"
 * Иначе убираем
 */
const themeClass = computed(() => {
  return themeValue.value >= 0.5 ? "night-theme" : "";
});

// Применяем/убираем класс на <body>
watch(
  themeClass,
  (newClass) => {
    const body = document.body;
    if (newClass === "night-theme") {
      body.classList.add("night-theme");
    } else {
      body.classList.remove("night-theme");
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--header-background);
  padding: 20px;
}

.app__main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--cv-background);
}

.app__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--footer-background);
  padding: 20px;
}
</style>
