<!-- src/components/ShaderTitle.vue -->

<template>
  <div class="shader-title">
    <h1 class="shader-title__intro-name">
      <!-- preName -->
      <span
        :class="{ 'shader-title__faded': isHover }"
        style="transition: opacity 0.5s, filter 0.5s"
      >
        {{ t("intro.preName") }}
      </span>

      <!-- name-part -->
      <span
        @mouseenter="hoverName(true)"
        @mouseleave="hoverName(false)"
        class="shader-title__name-part"
      >
        <span class="shader-title__name">
          <span class="shader-title__name-prefix">
            {{ t("intro.namePrefix") }}
          </span>
          <span class="shader-title__name-letter-o" ref="nameLetterO">
            {{ t("intro.nameO") }}
            <span class="shader-title__accent" ref="accent">́</span>
          </span>
          <span class="shader-title__name-suffix">
            {{ t("intro.nameSuffix") }}
          </span>
        </span>
      </span>

      <!-- postName -->
      <span
        :class="{ 'shader-title__faded': isHover }"
        style="transition: opacity 0.5s, filter 0.5s"
      >
        {{ t("intro.postName") }}
      </span>
    </h1>

    <!-- intro-description -->
    <p
      :class="{ 'shader-title__faded': isHover }"
      style="transition: opacity 0.5s, filter 0.5s"
      class="shader-title__intro-description"
    >
      {{ t("intro.welcome") }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { gsap } from "gsap";

const { t } = useI18n();

const accent = ref(null);
const isHover = ref(false);

const hoverName = (hover) => {
  isHover.value = hover;
  if (hover) {
    gsap.to(accent.value, { duration: 0.5, opacity: 1, y: -5 });
  } else {
    gsap.to(accent.value, { duration: 0.5, opacity: 0, y: 0 });
  }
};

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
  text-align: left;
  padding: 20px 40px;
  border-radius: 10px;
  z-index: 10;
  /* === ВАЖНО ===
     Вместо обычной var(--text-color),
     используем var(--shader-title-exclusion-color)
     для эффекта "exclusion" на белом/чёрном фоне.
  */
  color: var(--shader-title-exclusion-color);
  mix-blend-mode: exclusion;
}

.shader-title h1 {
  margin: 0;
  font-size: 28px;
}

.shader-title__intro-name {
  font-size: 1.9rem;
  margin-bottom: 1rem;
  line-height: 1.25;
  font-weight: normal;
  flex-wrap: wrap;
}

/* Пробел между span-ами */
.shader-title__intro-name > span:not(.shader-title__name-part) {
  margin-right: 0.22em;
}

.shader-title__intro-description {
  margin-top: 10px;
  font-size: 18px;
}

/* Остальные стили (hover, accent) — без изменений */
.shader-title__name-part {
  display: inline-block;
  position: relative;
  cursor: pointer;
  line-height: 1;
}

.shader-title__name {
  position: relative;
  display: inline-block;
}

.shader-title__name-letter-o {
  position: relative;
  display: inline-block;
}

.shader-title__accent {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(calc(-50% + 6px)) translateY(-100%);
  font-size: 0.8em;
  pointer-events: none;
  opacity: 0;
}

.shader-title__faded {
  opacity: 0.35;
  filter: blur(4px);
  transition: opacity 0.5s, filter 0.5s;
}
</style>
