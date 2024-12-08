<!-- src/views/CVPage.vue -->

<template>
  <div class="cv-page">
    <h2>{{ $t("cv.title") }}</h2>
    <p>{{ $t("cv.description") }}</p>
  </div>
</template>

<script setup></script>

<style scoped>
.cv-page {
  padding: 20px;
  color: var(--text-color);
  background-color: var(--background-color);
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Центрируем содержимое по вертикали */
  align-items: center; /* Центрируем содержимое по горизонтали */
  text-align: center;
}
</style>
