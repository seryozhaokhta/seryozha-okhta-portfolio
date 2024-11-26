<!-- src/views/ShaderTitle.vue -->

<template>
  <div class="shader-title">
    <h1 class="intro-name">
      {{ t("intro.preName") }}
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
        </span> </span
      >{{ t("intro.postName") }}
    </h1>
    <p class="intro-description">
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

const isHovered = ref(false);

// Ссылки на элементы
const accent = ref(null);

const hoverName = (hover) => {
  isHovered.value = hover;
  if (hover) {
    gsap.to(".name-part", { duration: 0.5, skewX: -10 });
    gsap.to(accent.value, { duration: 0.5, opacity: 1, y: -5 });
  } else {
    gsap.to(".name-part", { duration: 0.5, skewX: 0 });
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
  color: white;
  font-family: Helvetica, sans-serif;
  text-align: left;
  background: rgba(0, 0, 0, 0.3);
  padding: 20px 40px;
  border-radius: 10px;
  z-index: 10;
}

.shader-title h1 {
  margin: 0;
  font-size: 48px;
}

.intro-name {
  color: var(--intro-text-color-default);
  font-size: 1.9rem;
  margin-bottom: 1rem;
  line-height: 1.25;
  font-weight: normal;
}

.intro-description {
  margin-top: 10px;
  font-size: 18px;
}

.name-part {
  display: inline-block;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
  cursor: pointer;
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
  transform: translateX(calc(-50% + 12px)) translateY(-100%);
  font-size: 0.8em;
  pointer-events: none;
  opacity: 0;
}
</style>
