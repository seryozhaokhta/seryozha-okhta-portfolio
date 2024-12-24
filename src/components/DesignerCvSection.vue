<!-- src/components/DesignerCvSection.vue -->
<template>
  <section class="designer-cv-section">
    <!-- Заголовок / Описание / Навыки / Опыт работы — всё как у вас было -->
    <h2 class="designer-cv-section__title">{{ $t("cv.designer.title") }}</h2>
    <p class="designer-cv-section__description">
      {{ $t("cv.designer.description") }}
    </p>

    <!-- Навыки... -->
    <div class="designer-cv-section__skills">
      <h3>{{ $t("cv.designer.skills.title") }}</h3>

      <div class="designer-cv-section__skills-category">
        <strong>{{ $t("cv.skillsLabels.tools") }}</strong>
        <ul>
          <li v-for="tool in designerData.skills.tools" :key="tool">
            {{ tool }}
          </li>
        </ul>
      </div>

      <div class="designer-cv-section__skills-category">
        <strong>{{ $t("cv.skillsLabels.designPrinciples") }}</strong>
        <ul>
          <li
            v-for="principle in designerData.skills.designPrinciples"
            :key="principle"
          >
            {{ principle }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Опыт работы -->
    <div class="designer-cv-section__experience">
      <h3>{{ designerData.experienceTitle }}</h3>
      <div
        class="designer-cv-section__job"
        v-for="(job, index) in designerData.experience"
        :key="index"
      >
        <h4>
          {{ job.role }}
          <template v-if="job.company">at {{ job.company }}</template>
        </h4>
        <span class="designer-cv-section__job-years">{{ job.years }}</span>
        <p class="designer-cv-section__job-description">
          {{ job.description }}
        </p>
      </div>
    </div>

    <!-- ======== Блок "Портфолио" (Сетка) ======== -->
    <div class="designer-cv-section__portfolio">
      <h3 class="designer-cv-section__portfolio-title">
        {{ $t("cv.designerPortfolioTitle") || "My Design Works" }}
      </h3>
      <!-- Сетка из элементов -->
      <div class="designer-cv-section__grid">
        <!-- Проходимся по массиву медиа -->
        <div
          v-for="(item, idx) in designerMedia"
          :key="idx"
          class="portfolio-item"
        >
          <!-- Если это картинка (jpg/png/gif) -->
          <img
            v-if="item.type === 'image' || item.type === 'gif'"
            :src="item.src"
            :alt="item.alt"
            class="portfolio-item__media"
          />
          <!-- Если это видео (.mp4, например) -->
          <video
            v-else-if="item.type === 'video'"
            class="portfolio-item__media"
            controls
            muted
            playsinline
          >
            <source :src="item.src" type="video/mp4" />
            <!-- Другие форматы source при необходимости -->
          </video>

          <!-- Подпись (caption), если нужна -->
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

// Данные о резюме дизайнера (как и было)
const designerData = computed(() => {
  const isEn = locale.value === "en";
  return isEn ? cvEn.designer : cvRu.designer;
});

/*
 * Массив с медиа-файлами для портфолио.
 * Можно создавать сколько угодно, указывая type: 'image' / 'gif' / 'video'...
 */
const designerMedia = [
  {
    type: "image",
    src: new URL("@/assets/designer/design_1.jpg", import.meta.url),
    alt: "Mobile App UI/UX design",
    caption: "UI for a mobile app",
  },
  {
    type: "gif",
    src: new URL("@/assets/designer/design_2.gif", import.meta.url),
    alt: "Animated wireframe",
    caption: "Wireframe animation in Figma",
  },
  {
    type: "video",
    src: new URL("@/assets/designer/design_3.mp4", import.meta.url),
    alt: "Short design reel",
    caption: "Short portfolio reel",
  },
];
</script>

<style scoped>
.designer-cv-section {
  margin-bottom: 40px;
}

/* Остальные стили из вашего кода: заголовки, описания, и т.д. */
.designer-cv-section__title {
  font-size: 24px;
  margin-bottom: 10px;
  color: var(--text-color);
}
.designer-cv-section__description {
  margin-bottom: 20px;
  color: var(--text-color);
}
.designer-cv-section__skills {
  margin-top: 20px;
}
.designer-cv-section__skills-category {
  margin-bottom: 15px;
}
.designer-cv-section__experience {
  margin-top: 20px;
}
.designer-cv-section__job {
  margin-bottom: 15px;
}
.designer-cv-section__job-years {
  font-size: 0.9em;
  color: #555;
}
.designer-cv-section__job-description {
  margin: 5px 0 0 0;
  color: var(--text-color);
}

/* ====== Стили для портфолио/галереи ====== */
.designer-cv-section__portfolio {
  margin-top: 40px;
}

.designer-cv-section__portfolio-title {
  font-size: 20px;
  margin-bottom: 16px;
  color: var(--text-color);
}

.designer-cv-section__grid {
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
