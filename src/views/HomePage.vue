<!-- src/views/HomePage.vue -->

<template>
  <div class="home">
    <ShaderEffect :params="params" :c="c" :theme="themeValue" />
    <ShaderTitle />
    <ShaderControls :params="params" :onUpdate="handleUpdate" />
  </div>
</template>

<script setup>
import { useShader } from "@/composables/useShader";
import { useTheme } from "@/composables/useTheme";
import ShaderEffect from "@/components/ShaderEffect.vue";
import ShaderControls from "@/components/ShaderControls.vue";
import ShaderTitle from "@/components/ShaderTitle.vue";

const { params, c, randomizeC, updateParam } = useShader();
const { themeValue } = useTheme();

const handleUpdate = (key, value) => {
  if (key === "randomizeC") {
    randomizeC();
  } else {
    updateParam(key, value);
  }
};
</script>

<style scoped>
.home {
  /* Базовый стиль для домашней страницы */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.5s, color 0.5s;
}
</style>
