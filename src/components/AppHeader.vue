<!-- src/components/AppHeader.vue -->

<template>
  <header class="app-header">
    <h1>{{ $t("header.title") }}</h1>
    <div class="header-controls">
      <LanguageSwitcher />
      <ThemeSwitcher />
    </div>
  </header>
</template>

<script setup>
import LanguageSwitcher from "./LanguageSwitcher.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";
</script>

<style scoped>
.app-header {
  width: 100%;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}

.app-header h1 {
  margin: 0;
  font-size: 24px;
}

.header-controls {
  display: flex;
  align-items: center;
}
</style>
