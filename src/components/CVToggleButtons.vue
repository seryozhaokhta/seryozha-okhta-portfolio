<!-- src/components/CVToggleButtons.vue -->

<template>
  <div class="cv-toggle-wrapper">
    <div class="cv-toggle">
      <div
        class="cv-toggle-slider"
        :class="{
          'cv-toggle-slider--designer': activeCV === 'designer',
          'cv-toggle-slider--developer': activeCV === 'developer',
        }"
      ></div>
      <button
        class="cv-toggle-option"
        :aria-pressed="activeCV === 'designer'"
        @click="changeCV('designer')"
      >
        {{ $t("cv.cvPage.toggle.designer") }}
      </button>
      <button
        class="cv-toggle-option"
        :aria-pressed="activeCV === 'developer'"
        @click="changeCV('developer')"
      >
        {{ $t("cv.cvPage.toggle.developer") }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  activeCV: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:activeCV"]);

const changeCV = (cvType) => {
  emit("update:activeCV", cvType);
};
</script>

<style scoped>
.cv-toggle-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.cv-toggle {
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--toggle-background, #f0f0f0);
  border-radius: 20px;
  width: 250px;
  height: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cv-toggle-slider {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 50%;
  background-color: var(--slider-color, #007bff);
  border-radius: 20px;
  transition: transform 0.3s ease;
}

.cv-toggle-slider--designer {
  transform: translateX(0);
}

.cv-toggle-slider--developer {
  transform: translateX(100%);
}

.cv-toggle-option {
  flex: 1;
  z-index: 1;
  background: none;
  border: none;
  color: var(--button-text-color, #333);
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  line-height: 40px;
  transition: color 0.3s;
}

.cv-toggle-option:focus {
  outline: none;
}

.cv-toggle-option[aria-pressed="true"] {
  color: var(--button-hover-text-color, #ffffff);
}

@media (max-width: 480px) {
  .cv-toggle {
    height: 35px;
    max-width: 200px;
  }

  .cv-toggle-option {
    font-size: 12px;
  }
}
</style>
