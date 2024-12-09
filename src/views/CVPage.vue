<!-- src/views/CVPage.vue -->

<template>
  <div class="cv-page">
    <!-- Заголовок с тоггл-кнопкой -->
    <div class="cv-page__header">
      <h1 class="cv-page__title">
        {{ $t(`cv.cvPage.title.${activeCV}`) }}
      </h1>
      <div class="cv-page__toggle">
        <button
          :class="[
            'cv-page__toggle-button',
            { 'cv-page__toggle-button--active': activeCV === 'designer' },
          ]"
          @click="setActiveCV('designer')"
          :aria-pressed="activeCV === 'designer'"
        >
          {{ $t("cv.cvPage.toggle.designer") }}
        </button>
        <button
          :class="[
            'cv-page__toggle-button',
            { 'cv-page__toggle-button--active': activeCV === 'developer' },
          ]"
          @click="setActiveCV('developer')"
          :aria-pressed="activeCV === 'developer'"
        >
          {{ $t("cv.cvPage.toggle.developer") }}
        </button>
      </div>
    </div>

    <!-- Отображение данных CV -->
    <div class="cv-page__content">
      <!-- Дизайнер -->
      <section
        v-if="activeCV === 'designer' && cvData.designer"
        class="cv-page__section"
      >
        <h2 class="cv-page__section-title">{{ cvData.designer.title }}</h2>
        <p class="cv-page__section-description">
          {{ cvData.designer.description }}
        </p>

        <!-- Навыки -->
        <div class="cv-page__skills">
          <h3 class="cv-page__skills-title">
            {{ cvData.designer.skills.title }}
          </h3>
          <div class="cv-page__skills-category">
            <strong class="cv-page__skills-label">{{
              $t("cv.skillsLabels.tools")
            }}</strong>
            <ul class="cv-page__skills-list">
              <li
                v-for="tool in cvData.designer.skills.tools"
                :key="tool"
                class="cv-page__skill-item"
              >
                {{ tool }}
              </li>
            </ul>
          </div>
          <div class="cv-page__skills-category">
            <strong class="cv-page__skills-label">{{
              $t("cv.skillsLabels.designPrinciples")
            }}</strong>
            <ul class="cv-page__skills-list">
              <li
                v-for="principle in cvData.designer.skills.designPrinciples"
                :key="principle"
                class="cv-page__skill-item"
              >
                {{ principle }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Опыт работы -->
        <div class="cv-page__experience">
          <h3 class="cv-page__experience-title">
            {{ cvData.designer.experienceTitle }}
          </h3>
          <div
            class="cv-page__job"
            v-for="(job, index) in cvData.designer.experience"
            :key="index"
          >
            <h4 class="cv-page__job-title">
              {{ job.role }} at {{ job.company }}
            </h4>
            <span class="cv-page__job-years">{{ job.years }}</span>
            <p class="cv-page__job-description">{{ job.description }}</p>
          </div>
        </div>
      </section>

      <!-- Разработчик -->
      <section
        v-if="activeCV === 'developer' && cvData.developer"
        class="cv-page__section"
      >
        <h2 class="cv-page__section-title">{{ cvData.developer.title }}</h2>
        <p class="cv-page__section-description">
          {{ cvData.developer.description }}
        </p>

        <!-- Навыки -->
        <div class="cv-page__skills">
          <h3 class="cv-page__skills-title">
            {{ cvData.developer.skills.title }}
          </h3>
          <div class="cv-page__skills-category">
            <strong class="cv-page__skills-label">{{
              $t("cv.skillsLabels.languages")
            }}</strong>
            <ul class="cv-page__skills-list">
              <li
                v-for="lang in cvData.developer.skills.languages"
                :key="lang"
                class="cv-page__skill-item"
              >
                {{ lang }}
              </li>
            </ul>
          </div>
          <div class="cv-page__skills-category">
            <strong class="cv-page__skills-label">{{
              $t("cv.skillsLabels.frameworks")
            }}</strong>
            <ul class="cv-page__skills-list">
              <li
                v-for="framework in cvData.developer.skills.frameworks"
                :key="framework"
                class="cv-page__skill-item"
              >
                {{ framework }}
              </li>
            </ul>
          </div>
          <div class="cv-page__skills-category">
            <strong class="cv-page__skills-label">{{
              $t("cv.skillsLabels.other")
            }}</strong>
            <ul class="cv-page__skills-list">
              <li
                v-for="item in cvData.developer.skills.other"
                :key="item"
                class="cv-page__skill-item"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Опыт работы -->
        <div class="cv-page__experience">
          <h3 class="cv-page__experience-title">
            {{ cvData.developer.experienceTitle }}
          </h3>
          <div
            class="cv-page__job"
            v-for="(job, index) in cvData.developer.experience"
            :key="index"
          >
            <h4 class="cv-page__job-title">
              {{ job.role }} at {{ job.company }}
            </h4>
            <span class="cv-page__job-years">{{ job.years }}</span>
            <p class="cv-page__job-description">{{ job.description }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import cvEn from "@/locales/cv_en.json";
import cvRu from "@/locales/cv_ru.json";

// Используем глобальный локаль из vue-i18n
const { locale, t } = useI18n();

// Вычисляемые данные CV в зависимости от текущего языка
const cvData = computed(() => {
  return locale.value === "en" ? cvEn : cvRu;
});

// Состояние для активного CV: 'designer' или 'developer'
// Сохранение в localStorage для сохранения выбора между сессиями
const activeCV = ref(localStorage.getItem("activeCV") || "designer");

// Функция для установки активного CV
const setActiveCV = (cvType) => {
  activeCV.value = cvType;
  localStorage.setItem("activeCV", cvType); // Сохраняем выбор
};
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

.cv-page__toggle {
  display: flex;
  gap: 10px;
}

.cv-page__toggle-button {
  padding: 8px 16px;
  background-color: var(--button-background);
  color: var(--button-text-color);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.cv-page__toggle-button:hover {
  background-color: var(--button-hover-background, rgba(0, 0, 0, 0.2));
  color: var(--button-hover-text-color, #ffffff);
}

.cv-page__toggle-button--active {
  background-color: var(--button-active-background, #007bff);
  color: var(--button-active-text-color, #ffffff);
}

.cv-page__content {
  /* Дополнительные стили при необходимости */
}

.cv-page__section {
  margin-bottom: 40px;
}

.cv-page__section-title {
  font-size: 24px;
  margin-bottom: 10px;
  color: var(--text-color);
}

.cv-page__section-description {
  margin-bottom: 20px;
  color: var(--text-color);
}

.cv-page__skills {
  margin-top: 20px;
}

.cv-page__skills-title {
  font-size: 20px;
  margin-bottom: 10px;
  color: var(--text-color);
}

.cv-page__skills-category {
  margin-bottom: 10px;
}

.cv-page__skills-label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: var(--text-color);
}

.cv-page__skills-list {
  list-style-type: disc;
  padding-left: 20px;
}

.cv-page__skill-item {
  margin-bottom: 5px;
  color: var(--text-color);
}

.cv-page__experience {
  margin-top: 20px;
}

.cv-page__experience-title {
  font-size: 20px;
  margin-bottom: 10px;
  color: var(--text-color);
}

.cv-page__job {
  margin-bottom: 15px;
}

.cv-page__job-title {
  margin: 0;
  font-size: 16px;
  color: var(--text-color);
}

.cv-page__job-years {
  display: block;
  font-size: 0.9em;
  color: #555;
}

.cv-page__job-description {
  margin: 5px 0 0 0;
  color: var(--text-color);
}
</style>
