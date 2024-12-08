<!-- src/components/AppHeader.vue -->

<template>
  <div class="app-header">
    <div class="app-header__left-section">
      <router-link to="/">
        <LogoIcon />
      </router-link>
      <h1 class="app-header__title">{{ $t("header.title") }}</h1>
    </div>
    <div class="app-header__controls">
      <LanguageSwitcher />
      <ThemeSwitcher />
      <CVButton />
    </div>
  </div>
</template>

<script setup>
import LanguageSwitcher from "./LanguageSwitcher.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";
import LogoIcon from "./LogoIcon.vue";
import CVButton from "./CVButton.vue";
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: var(--header-background);
  backdrop-filter: blur(10px);
  padding: 20px;
  transition: background-color 0.5s, color 0.5s;
}

.app-header__title {
  margin: 0 0 0 10px;
  font-size: 24px;
  color: var(--text-color);
  transition: color 0.5s;
  mix-blend-mode: exclusion;
}

.app-header__left-section {
  display: flex;
  align-items: center;
}

.app-header__controls {
  display: flex;
  align-items: center;
}
</style>
