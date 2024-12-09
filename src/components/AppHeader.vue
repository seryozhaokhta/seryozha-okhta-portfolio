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
  align-items: center;
  width: 100%;
  /* Опционально:
  background-color: var(--header-background);
  padding: 20px;
  */
}

.app-header__left-section {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--logo-icon-color);
}

.app-header__title {
  margin: 0;
  font-size: 24px;
  color: var(--text-color);
}

.app-header__controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}
</style>
