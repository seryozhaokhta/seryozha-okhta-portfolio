<!-- src/components/ShaderControls.vue -->

<template>
  <div ref="guiContainer" class="gui-container"></div>
</template>

<script setup>
import { ref } from "vue";
import { useShaderGUI } from "../composables/useShaderGUI";

// Определяем пропсы
const props = defineProps({
  params: Object,
  onUpdate: Function,
});

// Ссылка на контейнер для GUI
const guiContainer = ref(null);

// Используем composable для инициализации dat.GUI, передавая контейнер
useShaderGUI(props.params, props.onUpdate, guiContainer);
</script>

<style scoped>
.gui-container {
  display: none;
}
</style>
