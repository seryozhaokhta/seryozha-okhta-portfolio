<!-- src/views/CVPage.vue -->

<template>
  <div class="cv-page">
    <!-- Заголовок + тоггл-кнопки -->
    <div class="cv-page__header">
      <h1 class="cv-page__title">
        {{ $t(`cv.cvPage.title.${activeCV}`) }}
      </h1>
      <CVToggleButtons v-model:activeCV="activeCV" />
    </div>

    <!-- Подгружаем либо Design, либо Dev -->
    <component :is="currentSectionComponent" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";

// Компоненты:
import CVToggleButtons from "@/components/CVToggleButtons.vue";
import DesignerCvSection from "@/components/DesignerCvSection.vue";
import DeveloperCvSection from "@/components/DeveloperCvSection.vue";

// Локаль (если нужно для чего-то ещё, например, для заголовка)
const { t } = useI18n();

// Текущее состояние: 'designer' или 'developer'
const activeCV = ref(localStorage.getItem("activeCV") || "designer");

// Отслеживаем изменения и пишем в localStorage
watch(activeCV, (newVal) => {
  localStorage.setItem("activeCV", newVal);
});

// Вычисляем, какой компонент показывать
const currentSectionComponent = computed(() => {
  return activeCV.value === "designer" ? DesignerCvSection : DeveloperCvSection;
});
</script>

<style scoped>
.cv-page {
  font-family: Arial, sans-serif;
  padding: 20px;
}

.cv-page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.cv-page__title {
  font-size: 28px;
  color: var(--text-color);
}
</style>
