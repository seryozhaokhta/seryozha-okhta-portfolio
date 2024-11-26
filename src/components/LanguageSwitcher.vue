<!-- src/components/LanguageSwitcher.vue -->

<template>
  <div>
    <button @click="switchLocale('en')">EN</button>
    <button @click="switchLocale('ru')">RU</button>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const switchLocale = (newLocale) => {
  locale.value = newLocale;
  localStorage.setItem("locale", newLocale);
};
</script>

<style scoped>
button {
  margin-right: 10px;
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
