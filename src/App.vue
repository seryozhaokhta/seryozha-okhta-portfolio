<!-- src/App.vue -->

<template>
  <div class="home-content">
    <AppHeader />
    <ShaderEffect :params="params" :c="c" :theme="themeValue" />
    <ShaderTitle />
    <ShaderControls :params="params" :onUpdate="handleUpdate" />
    <AppFooter />
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useShader } from "./composables/useShader";
import { useTheme } from "./composables/useTheme";
import AppHeader from "./components/AppHeader.vue";
import ShaderEffect from "./components/ShaderEffect.vue";
import ShaderControls from "./components/ShaderControls.vue";
import ShaderTitle from "./views/ShaderTitle.vue";
import AppFooter from "./components/AppFooter.vue";

// Используем composables
const { params, c, randomizeC, updateParam } = useShader();
const { themeValue, toggleTheme } = useTheme();

// Функция для обновления параметров шейдера
const handleUpdate = (key, value) => {
  if (key === "randomizeC") {
    randomizeC();
  } else {
    updateParam(key, value);
  }
};

// Вычисляем класс темы на основе themeValue
const themeClass = computed(() => {
  return themeValue.value >= 0.5 ? "dark-theme" : "";
});

// Watcher для применения класса темы к <body>
watch(
  themeClass,
  (newClass) => {
    const body = document.body;
    if (newClass === "dark-theme") {
      body.classList.add("dark-theme");
    } else {
      body.classList.remove("dark-theme");
    }
  },
  { immediate: true }
);
</script>

<style>
.home-content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Распределение пространства между хедером и футером */
  align-items: center;
  min-height: 100vh; /* Минимальная высота 100% высоты окна */
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  z-index: 1; /* Поверх шейдера */
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.5s, color 0.5s;
}
</style>
