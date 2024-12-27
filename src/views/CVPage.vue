<!-- src/views/CVPage.vue -->
<template>
  <div class="cv-page">
    <div class="cv-page__header">
      <h1 class="cv-page__title">
        {{ $t(`cv.cvPage.title.${activeCV}`) }}
      </h1>
      <CVToggleButtons v-model:activeCV="activeCV" />
    </div>

    <img class="cv-page__face-image" :src="myFaceSrc" alt="Photo" />

    <div class="cv-page__content">
      <component :is="currentSectionComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";

import CVToggleButtons from "@/components/CVToggleButtons.vue";
import DesignerCvSection from "@/components/DesignerCvSection.vue";
import DeveloperCvSection from "@/components/DeveloperCvSection.vue";

const { t } = useI18n();

// Переключение "designer"/"developer"
const activeCV = ref(localStorage.getItem("activeCV") || "designer");
watch(activeCV, (newVal) => {
  localStorage.setItem("activeCV", newVal);
});

const currentSectionComponent = computed(() => {
  return activeCV.value === "designer" ? DesignerCvSection : DeveloperCvSection;
});

// Фото
const myFaceSrc = new URL("@/assets/ansiktet mitt.jpg", import.meta.url);
</script>

<style scoped>
.cv-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* Цвета для CV: зависят от :root / body.night-theme */
  background-color: var(--cv-background);
  color: var(--cv-text-color);

  padding: 20px;
}

.cv-page__header {
  width: 100%;
  max-width: 960px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.cv-page__title {
  font-size: 28px;
  margin: 0;
}

.cv-page__face-image {
  display: block;
  max-width: 200px;
  margin: 0 auto 20px;
  border-radius: 50%;
  border: 2px solid var(--cv-text-color);
  transition: border-color 0.3s;
}
.cv-page__face-image:hover {
  border-color: rgba(255, 255, 255, 0.4);
}

.cv-page__content {
  width: 100%;
  max-width: 960px;
  padding: 0 10px;
}
</style>
