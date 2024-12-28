<!-- src/components/DeveloperCvSection.vue -->

<template>
  <section class="developer-cv-section">
    <!-- Заголовок / описание -->
    <h2 class="developer-cv-section__title">{{ $t("cv.developer.title") }}</h2>
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
          <template v-if="job.company"> at {{ job.company }}</template>
        </h4>
        <span class="developer-cv-section__job-years">{{ job.years }}</span>
        <p class="developer-cv-section__job-description">
          {{ job.description }}
        </p>
      </div>
    </div>

    <!-- Портфолио -->
    <div class="developer-cv-section__portfolio">
      <h3 class="developer-cv-section__portfolio-title">
        {{ $t("cv.developerPortfolioTitle") || "My Dev Projects" }}
      </h3>

      <!-- === Первая категория: Основные проекты === -->
      <div class="developer-cv-section__portfolio-category">
        <h4>
          {{ $t("cv.developerPortfolioMainProjectsTitle") || "Main Projects" }}
        </h4>
        <div class="developer-cv-section__grid">
          <div
            v-for="(item, idx) in developerMedia"
            :key="idx"
            class="portfolio-item"
            @mouseover="setHovered(idx)"
            @mouseleave="unsetHovered"
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
                <!-- Иконка "fullscreen" -->
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

            <!-- Медиа: image/gif/video -->
            <img
              v-if="item.type === 'image'"
              :src="item.src"
              :alt="item.alt"
              class="portfolio-item__media"
              loading="lazy"
            />
            <img
              v-else-if="item.type === 'gif'"
              :src="hoveredIndex === idx ? item.src : item.placeholderSrc"
              :alt="item.alt"
              class="portfolio-item__media"
              loading="lazy"
            />
            <video
              v-else-if="item.type === 'video'"
              class="portfolio-item__media"
              controls
              muted
              playsinline
              preload="metadata"
            >
              <source :src="item.src" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <!-- Подпись -->
            <p class="portfolio-item__caption" v-if="item.caption">
              {{ item.caption }}
            </p>
          </div>
        </div>
      </div>

      <!-- === Вторая категория: Дополнительные проекты === -->
      <div class="developer-cv-section__portfolio-category">
        <h4>
          {{
            $t("cv.developerPortfolioAdditionalProjectsTitle") ||
            "Additional Projects"
          }}
        </h4>
        <div class="developer-cv-section__grid">
          <div
            v-for="(item, idx) in developerAdditionalMedia"
            :key="idx"
            class="portfolio-item"
            @mouseover="setHovered(idx)"
            @mouseleave="unsetHovered"
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
                <!-- Иконка "fullscreen" -->
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

            <!-- Медиа: image/gif/video -->
            <img
              v-if="item.type === 'image'"
              :src="item.src"
              :alt="item.alt"
              class="portfolio-item__media"
              loading="lazy"
            />
            <img
              v-else-if="item.type === 'gif'"
              :src="hoveredIndex === idx ? item.src : item.placeholderSrc"
              :alt="item.alt"
              class="portfolio-item__media"
              loading="lazy"
            />
            <video
              v-else-if="item.type === 'video'"
              class="portfolio-item__media"
              controls
              muted
              playsinline
              preload="metadata"
            >
              <source :src="item.src" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <!-- Подпись -->
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
      <!-- Кнопка Закрыть -->
      <button class="fullscreen-overlay__close" @click="closeFullscreen">
        ✕
      </button>

      <div class="fullscreen-overlay__content">
        <!-- YouTube-видео -->
        <div
          v-if="fullscreenItem.type === 'youtube'"
          class="fullscreen-media fullscreen-media--youtube"
        >
          <iframe
            :src="fullscreenItem.src"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <!-- Изображение/gif/video -->
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
          preload="metadata"
        >
          <source :src="fullscreenItem.src" type="video/mp4" />
          Your browser does not support the video tag.
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

// Данные о разработчике
const developerData = computed(() => {
  return locale.value === "en" ? cvEn.developer : cvRu.developer;
});

// Основные проекты
const developerMedia = [
  {
    type: "image",
    src: new URL(
      "@/assets/developer/tor_ulven__stein-og-speil.png",
      import.meta.url
    ),
    alt: "Node.js Web App screenshot",
    caption: "Interactive web app with Node.js",
    link: "https://tor-ulven-stein-og-speil.vercel.app/",
  },
  {
    type: "video",
    src: new URL("@/assets/developer/Smart-greenhouses.mp4", import.meta.url),
    alt: "Video snippet of coding session",
    caption: "Short snippet of coding session",
    link: "https://greenhouse-react.vercel.app/",
    preload: "metadata", // Добавлено для оптимизации
  },
  {
    type: "image",
    src: new URL("@/assets/developer/The Knight.jpg", import.meta.url),
    alt: "Node.js Web App screenshot",
    caption: "Interactive web app with Node.js",
    link: "https://the-knight-in-the-panther-s-skin.vercel.app/",
  },
  {
    type: "gif",
    src: new URL("@/assets/developer/enheduanna.gif", import.meta.url),
    alt: "3D data visualization with Three.js",
    caption: "Animated 3D visualization",
    link: "https://enheduanna.vercel.app/",
    placeholderSrc: new URL(
      "@/assets/developer/enheduanna-placeholder.jpg",
      import.meta.url
    ), // Placeholder изображение
  },
];

// Дополнительные проекты
const developerAdditionalMedia = [
  {
    type: "gif",
    src: new URL("@/assets/developer/flower of particles.gif", import.meta.url),
    alt: "Additional Project 3",
    caption: "Description for additional project 3",
    link: "https://openprocessing.org/sketch/1950042",
    placeholderSrc: new URL(
      "@/assets/developer/flower-of-particles-placeholder.jpg",
      import.meta.url
    ), // Placeholder изображение
  },
];

// Состояние для отслеживания наведения
const hoveredIndex = ref(null);

function setHovered(index) {
  hoveredIndex.value = index;
}

function unsetHovered() {
  hoveredIndex.value = null;
}

// Модель фуллскрина
const fullscreenItem = ref(null);
function openFullscreen(item) {
  fullscreenItem.value = item;
}
function closeFullscreen() {
  fullscreenItem.value = null;
}
</script>

<style scoped>
.developer-cv-section {
  margin-bottom: 40px;
}

/* Заголовок, описание */
.developer-cv-section__title {
  font-size: 24px;
  margin-bottom: 10px;
  color: var(--text-color);
}

.developer-cv-section__description {
  margin-bottom: 20px;
  color: var(--text-color);
}

/* Навыки */
.developer-cv-section__skills {
  margin-top: 20px;
}
.developer-cv-section__skills-category {
  margin-bottom: 15px;
}

/* Опыт */
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

/* Портфолио */
.developer-cv-section__portfolio {
  margin-top: 40px;
}
.developer-cv-section__portfolio-title {
  font-size: 20px;
  margin-bottom: 16px;
  color: var(--text-color);
}

/* Подкатегории внутри портфолио */
.developer-cv-section__portfolio-category {
  margin-bottom: 30px;
}
.developer-cv-section__portfolio-category h4 {
  font-size: 18px;
  margin-bottom: 10px;
  color: var(--text-color);
}

.developer-cv-section__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

.portfolio-item {
  position: relative;
  background: var(--button-background);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 10px;
  text-align: center;
  transition: background 0.3s;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.portfolio-item:hover {
  background: var(--button-hover-background, rgba(0, 0, 0, 0.2));
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

/* Медиа */
.portfolio-item__media {
  display: block;
  border-radius: 4px;
  margin-top: 30px;
  width: 100%;
  object-fit: contain;
  object-position: center;
}

/* YouTube-thumbnail */
.portfolio-item__youtube-thumbnail {
  width: 100%;
  height: auto;
  border-radius: 4px;
  cursor: pointer;
}

/* Наложение с иконкой воспроизведения */
.play-button-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none; /* чтобы клики проходили через наложение */
}

/* img/gif/video => 200px */
.portfolio-item__media:not(.portfolio-item__youtube-thumbnail) {
  max-height: 200px;
}

.portfolio-item__caption {
  margin: 10px 0 0 0;
  font-size: 14px;
  color: var(--text-color);
}

/* --- Фуллскрин --- */
.fullscreen-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
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
  z-index: 1000; /* чтобы крестик был выше контента */
}

.fullscreen-overlay__content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Медиа для фуллскрин */
.fullscreen-media {
  border: none;
  object-fit: contain;
  object-position: center;
  margin: 0 auto;
  max-width: 90%;
  max-height: 90%;
}

/* Специфические стили для YouTube в фуллскрин */
.fullscreen-media--youtube {
  aspect-ratio: 16 / 9;
  width: 80%;
  height: auto;
}
.fullscreen-media--youtube iframe {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
</style>
