<!-- App.vue -->

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

const themeClass = computed(() => {
  return themeValue.value >= 0.5 ? "dark-theme" : "";
});

watch(
  themeClass,
  (newClass) => {
    const body = document.body;
    if (newClass === "dark-theme") {
      body.classList.add("dark-theme");
    } else {
      body.classList.remove("dark-theme");
    }
  },
  { immediate: true }
);
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Делает футер "прижатым" к низу при мало контента */
}

.app__main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
