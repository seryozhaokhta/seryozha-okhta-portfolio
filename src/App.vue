<!-- src/App.vue -->

<template>
  <div :style="themeStyles" class="home-content">
    <AppHeader />
    <ShaderEffect :params="params" :c="c" :theme="themeValue" />
    <ShaderTitle />
    <ShaderControls :params="params" :onUpdate="handleUpdate" />
    <AppFooter />
  </div>
</template>

<script setup>
import { computed } from "vue";
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

// Линейная интерполяция
const lerp = (a, b, t) => {
  return a + (b - a) * t;
};

// Вычисляем стиль на основе themeValue
const themeStyles = computed(() => {
  return {
    "--background-color": `rgb(${Math.round(
      lerp(255, 0, themeValue.value)
    )}, ${Math.round(lerp(255, 0, themeValue.value))}, ${Math.round(
      lerp(255, 0, themeValue.value)
    )})`,
    "--text-color": `rgb(${Math.round(
      lerp(0, 255, themeValue.value)
    )}, ${Math.round(lerp(0, 255, themeValue.value))}, ${Math.round(
      lerp(0, 255, themeValue.value)
    )})`,
    backgroundColor: "var(--background-color)",
    color: "var(--text-color)",
    transition: "background-color 0.5s, color 0.5s",
  };
});
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
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  z-index: 1; /* Поверх шейдера */
}
</style>
