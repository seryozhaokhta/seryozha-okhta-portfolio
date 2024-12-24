<!-- src/components/DeveloperCvSection.vue -->

<template>
  <section class="developer-cv-section">
    <!-- Заголовок -->
    <h2 class="developer-cv-section__title">
      {{ $t("cv.developer.title") }}
    </h2>
    <p class="developer-cv-section__description">
      {{ $t("cv.developer.description") }}
    </p>

    <!-- Навыки -->
    <div class="developer-cv-section__skills">
      <h3>{{ $t("cv.developer.skills.title") }}</h3>

      <!-- Языки -->
      <div class="developer-cv-section__skills-category">
        <strong>{{ $t("cv.skillsLabels.languages") }}</strong>
        <ul>
          <li v-for="lang in developerData.skills.languages" :key="lang">
            {{ lang }}
          </li>
        </ul>
      </div>

      <!-- Фреймворки -->
      <div class="developer-cv-section__skills-category">
        <strong>{{ $t("cv.skillsLabels.frameworks") }}</strong>
        <ul>
          <li
            v-for="framework in developerData.skills.frameworks"
            :key="framework"
          >
            {{ framework }}
          </li>
        </ul>
      </div>

      <!-- Прочее -->
      <div class="developer-cv-section__skills-category">
        <strong>{{ $t("cv.skillsLabels.other") }}</strong>
        <ul>
          <li v-for="item in developerData.skills.other" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Опыт работы -->
    <div class="developer-cv-section__experience">
      <h3>{{ developerData.experienceTitle }}</h3>
      <div
        class="developer-cv-section__job"
        v-for="(job, index) in developerData.experience"
        :key="index"
      >
        <h4>
          {{ job.role }}
          <template v-if="job.company">at {{ job.company }}</template>
        </h4>
        <span class="developer-cv-section__job-years">{{ job.years }}</span>
        <p class="developer-cv-section__job-description">
          {{ job.description }}
        </p>
      </div>
    </div>

    <!-- ================== ПОРТФОЛИО ================== -->
    <div class="developer-cv-section__portfolio">
      <!-- Заголовок для галереи -->
      <h3 class="developer-cv-section__portfolio-title">
        {{ $t("cv.developerPortfolioTitle") || "My Dev Projects" }}
      </h3>

      <!-- Сетка -->
      <div class="developer-cv-section__grid">
        <div
          v-for="(item, idx) in developerMedia"
          :key="idx"
          class="portfolio-item"
        >
          <!-- Рендерим <img> или <video> в зависимости от item.type -->
          <!-- Для .gif тоже можно использовать <img>, т. к. gif воспроизводится сам -->
          <img
            v-if="item.type === 'image' || item.type === 'gif'"
            :src="item.src"
            :alt="item.alt"
            class="portfolio-item__media"
          />
          <video
            v-else-if="item.type === 'video'"
            class="portfolio-item__media"
            controls
            muted
            playsinline
          >
            <source :src="item.src" type="video/mp4" />
            <!-- Можно добавить другие форматы <source>, если нужно -->
          </video>

          <!-- Подпись (caption) если есть -->
          <p class="portfolio-item__caption" v-if="item.caption">
            {{ item.caption }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import cvEn from "@/locales/cv_en.json";
import cvRu from "@/locales/cv_ru.json";

const { locale, t } = useI18n();

// Загрузка данных о разработчике (навыки, опыт) в зависимости от языка
const developerData = computed(() => {
  const isEn = locale.value === "en";
  return isEn ? cvEn.developer : cvRu.developer;
});

/*
 * Массив с разными файлами: .png, .gif, .mp4 и т.п.
 * "type" определяет, что рендерить: <img> или <video>.
 * "caption" — опциональная подпись.
 */
const developerMedia = [
  {
    type: "image",
    src: new URL("@/assets/developer/dev_1.png", import.meta.url),
    alt: "Node.js Web App screenshot",
    caption: "Interactive web app with Node.js",
  },
  {
    type: "gif",
    src: new URL("@/assets/developer/dev_2.gif", import.meta.url),
    alt: "3D data visualization with Three.js",
    caption: "Animated 3D visualization",
  },
  {
    type: "video",
    src: new URL("@/assets/developer/dev_3.mp4", import.meta.url),
    alt: "Video snippet of coding session",
    caption: "Short snippet of coding session",
  },
];
</script>

<style scoped>
.developer-cv-section {
  margin-bottom: 40px;
}

/* Заголовок, описание — ваш существующий код */
.developer-cv-section__title {
  font-size: 24px;
  margin-bottom: 10px;
  color: var(--text-color);
}

.developer-cv-section__description {
  margin-bottom: 20px;
  color: var(--text-color);
}

.developer-cv-section__skills {
  margin-top: 20px;
}

.developer-cv-section__skills-category {
  margin-bottom: 15px;
}

.developer-cv-section__experience {
  margin-top: 20px;
}

.developer-cv-section__job {
  margin-bottom: 15px;
}

.developer-cv-section__job-years {
  font-size: 0.9em;
  color: #555;
}

.developer-cv-section__job-description {
  margin: 5px 0 0 0;
  color: var(--text-color);
}

/* ======= Портфолио (галерея/сетка) ======= */
.developer-cv-section__portfolio {
  margin-top: 40px;
}

.developer-cv-section__portfolio-title {
  font-size: 20px;
  margin-bottom: 16px;
  color: var(--text-color);
}

.developer-cv-section__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

.portfolio-item {
  background: var(--button-background);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 10px;
  text-align: center;
  position: relative;
  transition: background 0.3s;
}

.portfolio-item:hover {
  background: var(--button-hover-background, rgba(255, 255, 255, 0.2));
}

.portfolio-item__media {
  width: 100%;
  height: auto;
  border-radius: 4px;
  display: block;
  margin: 0 auto 10px;
}

.portfolio-item__caption {
  margin: 0;
  font-size: 14px;
  color: var(--text-color);
}
</style>
