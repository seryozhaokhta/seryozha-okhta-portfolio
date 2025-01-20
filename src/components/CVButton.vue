<!-- src/components/CVButton.vue -->

<template>
  <router-link to="/cv" class="cv-button">
    {{ $t("header.cv") }}
  </router-link>
</template>

<script setup></script>

<style scoped>
.cv-button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: var(--button-background);
  color: var(--button-text-color);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 5px;
  text-decoration: none;
}

.cv-button:hover {
  background-color: var(--button-hover-background, rgba(0, 0, 0, 0.2));
  color: var(--button-hover-text-color, #ffffff);
}

@media screen and (max-width: 768px) {
  .cv-button {
    padding: 3px 8px;
    font-size: 12px;
    max-width: 80px; /* Ограничиваем ширину кнопки */
    white-space: nowrap; /* Предотвращаем перенос текста */
    overflow: hidden;
    text-overflow: ellipsis; /* Добавляем многоточие */
    text-align: center; /* Выравниваем текст */
  }
}
</style>
