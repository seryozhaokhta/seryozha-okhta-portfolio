<!-- src/components/CVToggleButtons.vue -->

<template>
  <div class="cv-toggle-buttons">
    <button
      :class="[
        'cv-toggle-button',
        { 'cv-toggle-button--active': activeCV === 'designer' },
      ]"
      @click="changeCV('designer')"
      :aria-pressed="activeCV === 'designer'"
    >
      {{ $t("cv.cvPage.toggle.designer") }}
    </button>
    <button
      :class="[
        'cv-toggle-button',
        { 'cv-toggle-button--active': activeCV === 'developer' },
      ]"
      @click="changeCV('developer')"
      :aria-pressed="activeCV === 'developer'"
    >
      {{ $t("cv.cvPage.toggle.developer") }}
    </button>
  </div>
</template>

<script setup>
// Removed the import statement for defineProps and defineEmits

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
.cv-toggle-buttons {
  display: flex;
  gap: 10px;
}

.cv-toggle-button {
  padding: 8px 16px;
  background-color: var(--button-background);
  color: var(--button-text-color);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.cv-toggle-button:hover {
  background-color: var(--button-hover-background, rgba(0, 0, 0, 0.2));
  color: var(--button-hover-text-color, #ffffff);
}

.cv-toggle-button--active {
  background-color: var(--button-active-background, #007bff);
  color: var(--button-active-text-color, #ffffff);
}
</style>
