<!-- src/components/LanguageSwitcher.vue -->

<template>
  <div class="language-switcher">
    <button
      class="language-switcher__button"
      @click="toggleLocale"
      :aria-label="`Switch language to ${nextLocale.toUpperCase()}`"
    >
      {{ nextLocale.toUpperCase() }}
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const currentLocale = computed(() => locale.value);
const nextLocale = computed(() => (locale.value === "ru" ? "en" : "ru"));

const toggleLocale = () => {
  locale.value = nextLocale.value;
  localStorage.setItem("locale", locale.value);
};

const storedLocale = localStorage.getItem("locale");
if (storedLocale) {
  locale.value = storedLocale;
}
</script>

<style scoped>
.language-switcher {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.language-switcher__button {
  background-color: var(--button-background, #f0f0f0);
  color: var(--button-text-color, #333);
  border: 1px solid var(--button-border-color, #ccc);
  padding: 5px 12px;
  font-size: 14px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
}

.language-switcher__button:hover {
  background-color: var(--button-hover-background, #ddd);
  color: var(--button-hover-text-color, #000);
  transform: scale(1.05);
}

.language-switcher__button:active {
  background-color: var(--button-active-background, #bbb);
}

@media (max-width: 600px) {
  .language-switcher {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .language-switcher__button {
    font-size: 12px;
    padding: 8px 15px;
  }
}
</style>
