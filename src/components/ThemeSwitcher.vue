<!-- src/components/ThemeSwitcher.vue -->

<template>
  <button @click="toggleTheme">
    {{ themeLabel }}
  </button>
</template>

<script setup>
import { computed } from "vue";
import { useTheme } from "@/composables/useTheme";
import { useI18n } from "vue-i18n";

/**
 * Если themeValue < 0.5 => "Day"
 * Если themeValue >= 0.5 => "Night"
 */
const { t } = useI18n();
const { themeValue, toggleTheme } = useTheme();

const themeLabel = computed(() => {
  return themeValue.value >= 0.5
    ? t("header.theme.night")
    : t("header.theme.day");
});
</script>

<style scoped>
button {
  margin-left: 10px;
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
</style>
