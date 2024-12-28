<!-- src/components/DesignerCvSection.vue -->

<template>
  <section class="designer-cv-section">
    <!-- Заголовок / описание -->
    <h2 class="designer-cv-section__title">{{ $t("cv.designer.title") }}</h2>
    <p class="designer-cv-section__description">
      {{ $t("cv.designer.description") }}
    </p>

    <!-- Навыки -->
    <div class="designer-cv-section__skills">
      <h3>{{ $t("cv.designer.skills.title") }}</h3>

      <!-- Инструменты -->
      <div class="designer-cv-section__skills-category">
        <strong>{{ $t("cv.skillsLabels.tools") }}</strong>
        <ul>
          <li v-for="tool in designerData.skills.tools" :key="tool">
            {{ tool }}
          </li>
        </ul>
      </div>

      <!-- Принципы дизайна -->
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

    <!-- Портфолио -->
    <div class="designer-cv-section__portfolio">
      <h3 class="designer-cv-section__portfolio-title">
        {{ $t("cv.designerPortfolioTitle") || "My Design Works" }}
      </h3>

      <!-- ==== Категория 1: Моушн и 3D-дизайн ==== -->
      <div class="designer-cv-section__portfolio-category">
        <h4>{{ $t("cv.designerPortfolioMotionTitle") }}</h4>
        <div class="designer-cv-section__grid">
          <div
            v-for="(item, idx) in motionMedia"
            :key="idx"
            class="portfolio-item"
          >
            <div class="portfolio-item__actions">
              <a
                v-if="item.link"
                :href="item.link"
                target="_blank"
                rel="noopener"
                class="portfolio-item__action-btn"
              >
                <!-- Иконка-ссылка -->
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 3L19.99 3C20.54 3 21 3.45 21 4V10C21 10.55 20.54 11 19.99 11C19.44 11 19 10.55 19 10V6.41L12.04 13.37C11.65 13.76 11.02 13.76 10.63 13.37C10.24 12.98 10.24 12.35 10.63 11.96L17.59 5H14C13.45 5 13 4.55 13 4C13 3.45 13.45 3 14 3Z"
                  />
                  <path
                    d="M5 21C4.45 21 4 20.55 4 20V7C4 6.45 4.45 6 5 6C5.55 6 6 6.45 6 7V20H17C17.55 20 18 20.45 18 21C18 21.55 17.55 22 17 22H5Z"
                  />
                </svg>
              </a>
              <button
                class="portfolio-item__action-btn"
                @click="openFullscreen(item)"
              >
                <!-- Иконка "Fullscreen" -->
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3H10V5H5V10H3V3ZM14 3H21V10H19V5H14V3ZM19 14H21V21H14V19H19V14ZM5 19H10V21H3V14H5V19Z"
                  />
                </svg>
              </button>
            </div>

            <!-- Тип "youtube" -->
            <iframe
              v-if="item.type === 'youtube'"
              class="portfolio-item__media portfolio-item__media--iframe"
              :src="item.src"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            >
            </iframe>
            <img
              v-else-if="item.type === 'image' || item.type === 'gif'"
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
            </video>

            <p class="portfolio-item__caption" v-if="item.caption">
              {{ item.caption }}
            </p>
          </div>
        </div>
      </div>

      <!-- ==== Категория 2: UX/UI дизайн ==== -->
      <div class="designer-cv-section__portfolio-category">
        <h4>{{ $t("cv.designerPortfolioUxuiTitle") }}</h4>
        <div class="designer-cv-section__grid">
          <div
            v-for="(item, idx) in designerMedia"
            :key="idx"
            class="portfolio-item"
          >
            <div class="portfolio-item__actions">
              <a
                v-if="item.link"
                :href="item.link"
                target="_blank"
                rel="noopener"
                class="portfolio-item__action-btn"
              >
                <!-- Иконка-ссылка -->
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 3L19.99 3C20.54 3 21 3.45 21 4V10C21 10.55 20.54 11 19.99 11C19.44 11 19 10.55 19 10V6.41L12.04 13.37C11.65 13.76 11.02 13.76 10.63 13.37C10.24 12.98 10.24 12.35 10.63 11.96L17.59 5H14C13.45 5 13 4.55 13 4C13 3.45 13.45 3 14 3Z"
                  />
                  <path
                    d="M5 21C4.45 21 4 20.55 4 20V7C4 6.45 4.45 6 5 6C5.55 6 6 6.45 6 7V20H17C17.55 20 18 20.45 18 21C18 21.55 17.55 22 17 22H5Z"
                  />
                </svg>
              </a>
              <button
                class="portfolio-item__action-btn"
                @click="openFullscreen(item)"
              >
                <!-- Иконка "Fullscreen" -->
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3H10V5H5V10H3V3ZM14 3H21V10H19V5H14V3ZM19 14H21V21H14V19H19V14ZM5 19H10V21H3V14H5V19Z"
                  />
                </svg>
              </button>
            </div>

            <!-- Медиа: img/gif/video -->
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
            </video>

            <p class="portfolio-item__caption" v-if="item.caption">
              {{ item.caption }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Фуллскрин оверлей -->
    <div
      v-if="fullscreenItem"
      class="fullscreen-overlay"
      @click.self="closeFullscreen"
    >
      <button class="fullscreen-overlay__close" @click="closeFullscreen">
        ✕
      </button>
      <div class="fullscreen-overlay__content">
        <!-- if youtube, iframe; else if image/gif, <img>; else if video, <video> -->
        <iframe
          v-if="fullscreenItem.type === 'youtube'"
          :src="fullscreenItem.src"
          class="fullscreen-media"
          frameborder="0"
          allowfullscreen
        ></iframe>

        <img
          v-else-if="
            fullscreenItem.type === 'image' || fullscreenItem.type === 'gif'
          "
          :src="fullscreenItem.src"
          :alt="fullscreenItem.alt"
          class="fullscreen-media"
        />
        <video
          v-else-if="fullscreenItem.type === 'video'"
          class="fullscreen-media"
          controls
          autoplay
          muted
          playsinline
        >
          <source :src="fullscreenItem.src" type="video/mp4" />
        </video>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import cvEn from "@/locales/cv_en.json";
import cvRu from "@/locales/cv_ru.json";

// Локализация
const { locale, t } = useI18n();

// Данные дизайнера
const designerData = computed(() => {
  return locale.value === "en" ? cvEn.designer : cvRu.designer;
});

// === Новая категория: Motion & 3D design ===
const motionMedia = [
  {
    type: "youtube",
    src: "https://www.youtube.com/embed/UydIPVDlZIY",
    alt: "Motion Design Demo",
    caption: "A short motion design reel",
    link: "https://www.youtube.com/watch?v=UydIPVDlZIY",
  },
];

// === Вторая категория: UX/UI design ===
const designerMedia = [
  {
    type: "image",
    src: new URL("@/assets/designer/design_1.jpg", import.meta.url),
    alt: "Mobile App UI/UX design",
    caption: "UI for a mobile app",
    link: "https://example.com/designer-mobile-app",
  },
  {
    type: "gif",
    src: new URL("@/assets/designer/design_2.gif", import.meta.url),
    alt: "Animated wireframe",
    caption: "Wireframe animation in Figma",
    link: "https://example.com/designer-wireframe",
  },
  {
    type: "video",
    src: new URL("@/assets/designer/design_3.mp4", import.meta.url),
    alt: "Short design reel",
    caption: "Short portfolio reel",
    link: "https://example.com/designer-reel",
  },
];

// Фуллскрин
const fullscreenItem = ref(null);
function openFullscreen(item) {
  fullscreenItem.value = item;
}
function closeFullscreen() {
  fullscreenItem.value = null;
}
</script>

<style scoped>
.designer-cv-section {
  margin-bottom: 40px;
}

/* Заголовок, описание */
.designer-cv-section__title {
  font-size: 24px;
  margin-bottom: 10px;
  color: var(--text-color);
}

.designer-cv-section__description {
  margin-bottom: 20px;
  color: var(--text-color);
}

/* Навыки */
.designer-cv-section__skills {
  margin-top: 20px;
}
.designer-cv-section__skills-category {
  margin-bottom: 15px;
}

/* Опыт */
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

/* Портфолио */
.designer-cv-section__portfolio {
  margin-top: 40px;
}
.designer-cv-section__portfolio-title {
  font-size: 20px;
  margin-bottom: 16px;
  color: var(--text-color);
}

/* Подкатегории внутри портфолио */
.designer-cv-section__portfolio-category {
  margin-bottom: 30px;
}
.designer-cv-section__portfolio-category h4 {
  font-size: 18px;
  margin-bottom: 10px;
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

  /* Аналогично developer */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.portfolio-item:hover {
  background: var(--button-hover-background, rgba(255, 255, 255, 0.2));
}

.portfolio-item__actions {
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  gap: 6px;
}

.portfolio-item__action-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-color);
  opacity: 0.7;
  transition: opacity 0.3s;
}
.portfolio-item__action-btn:hover {
  opacity: 1;
}

.portfolio-item__media {
  border-radius: 4px;
  display: block;
  object-fit: contain;
  object-position: center;
  width: 100%;
  max-height: 200px;
  margin-top: 30px;
}

.portfolio-item__media--iframe {
  min-height: 200px;
}

.portfolio-item__caption {
  margin: 10px 0 0 0;
  font-size: 14px;
  color: var(--text-color);
}

/* Фуллскрин */
.fullscreen-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fullscreen-overlay__close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #fff;
  font-size: 28px;
  cursor: pointer;
}
.fullscreen-overlay__content {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 95vw;
  max-height: 95vh;
  overflow: auto;
}
.fullscreen-media {
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: center;
  border-radius: 4px;
}
</style>
