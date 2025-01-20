<!-- src/components/LanguageSwitcher.vue -->

<template>
  <div>
    <button @click="switchLocale('en')">{{ t("header.language.en") }}</button>
    <button @click="switchLocale('ru')">{{ t("header.language.ru") }}</button>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { locale, t } = useI18n();

const switchLocale = (newLocale) => {
  locale.value = newLocale;
  localStorage.setItem("locale", newLocale);
};
</script>

<style scoped>
button {
  margin-right: 10px;
  padding: 5px 10px;
  background-color: var(--button-background);
  color: var(--button-text-color);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 5px;
}

button:hover {
  background-color: var(--button-hover-background, rgba(0, 0, 0, 0.2));
  color: var(--button-hover-text-color, #ffffff);
}

@media screen and (max-width: 768px) {
  div {
    display: flex;
    gap: 5px; /* Расстояние между кнопками */
    flex-wrap: wrap;
    justify-content: center;
  }

  button {
    padding: 3px 8px; /* Уменьшаем кнопки */
    font-size: 12px; /* Делаем шрифт меньше */
  }
}
</style>
