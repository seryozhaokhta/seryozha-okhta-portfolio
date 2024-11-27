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

<style scoped></style>
