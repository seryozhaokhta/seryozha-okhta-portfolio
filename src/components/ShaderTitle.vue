<!-- src/components/ShaderTitle.vue -->

<template>
  <div class="shader-title">
    <h1 class="intro-name">
      <!-- preName с плавным переходом -->
      <span
        :class="{ faded: isHover }"
        style="transition: opacity 0.5s, filter 0.5s"
      >
        {{ t("intro.preName") }}
      </span>

      <!-- name-part без класса faded и без transition -->
      <span
        @mouseenter="hoverName(true)"
        @mouseleave="hoverName(false)"
        class="name-part"
      >
        <!-- Используем части имени из локализации -->
        <span class="name">
          <span class="name-prefix">{{ t("intro.namePrefix") }}</span>
          <span class="name-letter-o" ref="nameLetterO">
            {{ t("intro.nameO") }}
            <span class="accent" ref="accent">́</span>
          </span>
          <span class="name-suffix">{{ t("intro.nameSuffix") }}</span>
        </span>
      </span>

      <!-- postName с плавным переходом -->
      <span
        :class="{ faded: isHover }"
        style="transition: opacity 0.5s, filter 0.5s"
      >
        {{ t("intro.postName") }}
      </span>
    </h1>

    <!-- intro-description с плавным переходом -->
    <p
      :class="{ faded: isHover }"
      style="transition: opacity 0.5s, filter 0.5s"
      class="intro-description"
    >
      {{ t("intro.welcome") }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { gsap } from "gsap";

// Используем i18n для локализации
const { t } = useI18n();

// Ссылка на элемент ударения
const accent = ref(null);

// Состояние наведения
const isHover = ref(false);

// Функция для анимации ударения при наведении
const hoverName = (hover) => {
  isHover.value = hover;
  if (hover) {
    gsap.to(accent.value, { duration: 0.5, opacity: 1, y: -5 });
  } else {
    gsap.to(accent.value, { duration: 0.5, opacity: 0, y: 0 });
  }
};

// Устанавливаем начальное состояние ударения
onMounted(() => {
  gsap.set(accent.value, { opacity: 0 });
});
</script>

<style scoped>
.shader-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--text-color);
  text-align: left;
  padding: 20px 40px;
  border-radius: 10px;
  z-index: 10;
  mix-blend-mode: exclusion;
}

.shader-title h1 {
  margin: 0;
  font-size: 28px;
}

.intro-name {
  font-size: 1.9rem;
  margin-bottom: 1rem;
  line-height: 1.25;
  flex-wrap: wrap;
  font-weight: normal;
}

.intro-name > span:not(.name-part) {
  margin-right: 0.22em; /* Добавляет промежуток между элементами */
}

.intro-description {
  margin-top: 10px;
  font-size: 18px;
}

.name-part {
  display: inline-block;
  position: relative;
  cursor: pointer;
  line-height: 1;
}

.name {
  position: relative;
  display: inline-block;
}

.name-letter-o {
  position: relative;
  display: inline-block;
}

.accent {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(calc(-50% + 6px)) translateY(-100%);
  font-size: 0.8em;
  pointer-events: none;
  opacity: 0;
}

.faded {
  opacity: 0.35;
  filter: blur(4px);
  transition: opacity 0.5s, filter 0.5s;
}
</style>
