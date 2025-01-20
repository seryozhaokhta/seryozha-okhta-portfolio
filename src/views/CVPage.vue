<!-- src/views/CVPage.vue -->
<template>
  <div id="cv-page" class="cv-page">
    <div class="cv-page__header">
      <!-- <h1 class="cv-page__title">
        {{ $t(`cv.cvPage.title.${activeCV}`) }}
      </h1> -->
      <CVToggleButtons v-model:activeCV="activeCV" />
    </div>

    <!-- Использование директивы v-lazy вместо :src и loading="lazy" -->
    <img class="cv-page__face-image" v-lazy="myFaceSrc" alt="Photo" />

    <div class="cv-page__content">
      <Suspense>
        <template #default>
          <component :is="currentSectionComponent" />
        </template>
        <template #fallback>
          <div class="loading">Загрузка...</div>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineAsyncComponent } from "vue";
import { useI18n } from "vue-i18n";

import CVToggleButtons from "@/components/CVToggleButtons.vue";

// Динамический импорт компонентов с ленивой загрузкой
const DesignerCvSection = defineAsyncComponent(() =>
  import("@/components/DesignerCvSection.vue")
);
const DeveloperCvSection = defineAsyncComponent(() =>
  import("@/components/DeveloperCvSection.vue")
);

const { t } = useI18n();

// Переключение "designer"/"developer"
const activeCV = ref(localStorage.getItem("activeCV") || "developer");
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
  background-color: var(--cv-background);
  color: var(--cv-text-color);
}

.cv-page__header {
  width: 100%;
  max-width: 960px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  padding: 10px;
}

.cv-page__title {
  font-size: 16px;
  margin: 0;
  /* display: none; */
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

.loading {
  text-align: center;
  font-size: 18px;
  color: var(--cv-text-color);
}

@media (max-width: 480px) {
  .cv-page__face-image {
    max-width: 150px;
  }
}
</style>
