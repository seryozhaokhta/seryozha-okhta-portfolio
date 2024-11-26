<!-- src/components/ShaderEffect.vue -->

<template>
  <div ref="canvasContainer" class="canvas-container"></div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import p5 from "p5";
import fragShader from "../assets/shader.frag";
import vertShader from "../assets/shader.vert";

// Получение пропсов
const props = defineProps({
  params: {
    type: Object,
    required: true,
  },
  c: {
    type: Array,
    required: true,
  },
  theme: {
    type: Number,
    required: true,
  },
});

// Ссылка на контейнер канваса
const canvasContainer = ref(null);
let shaderProgram = null;

// Функция для построения массива c из props
const buildC = () => {
  const c = [];
  for (let i = 0; i < props.c.length; i++) {
    c[i] = props.c[i];
  }
  return c;
};

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    shaderProgram = p.createShader(vertShader, fragShader);
    p.shader(shaderProgram);

    // Установка начальных uniform-переменных
    shaderProgram.setUniform("noctaves", props.params.noctaves);
    shaderProgram.setUniform("smoothstepLow", props.params.smoothstepLow);
    shaderProgram.setUniform("smoothstepHigh", props.params.smoothstepHigh);
    shaderProgram.setUniform("colorExponent", props.params.colorExponent);
    shaderProgram.setUniform("c", buildC());
    shaderProgram.setUniform("theme", props.theme); // Передаём числовое значение темы

    // Отладка
    console.log("Initial theme set to:", props.theme === 1.0 ? "night" : "day");
  };

  p.draw = () => {
    shaderProgram.setUniform("iResolution", [p.width, p.height]);
    shaderProgram.setUniform("iTime", p.millis() * 0.001);
    shaderProgram.setUniform("iMouse", [
      p.mouseX / p.width,
      p.mouseY / p.height,
    ]);
    shaderProgram.setUniform("c", buildC());
    shaderProgram.setUniform("theme", props.theme); // Обновление темы

    p.rect(-p.width / 2, -p.height / 2, p.width, p.height);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

onMounted(() => {
  new p5(sketch, canvasContainer.value);
});

// Наблюдение за изменениями параметров и обновление шейдера
watch(
  () => props.params,
  (newParams) => {
    if (shaderProgram) {
      shaderProgram.setUniform("noctaves", newParams.noctaves);
      shaderProgram.setUniform("smoothstepLow", newParams.smoothstepLow);
      shaderProgram.setUniform("smoothstepHigh", newParams.smoothstepHigh);
      shaderProgram.setUniform("colorExponent", newParams.colorExponent);
      shaderProgram.setUniform("c", buildC());

      // Отладка
      // console.log("Shader parameters updated:", newParams);
    }
  },
  { deep: true }
);

// Наблюдение за изменениями темы
watch(
  () => props.theme,
  (newTheme) => {
    if (shaderProgram) {
      shaderProgram.setUniform("theme", newTheme);
      // Отладка
      console.log("Theme toggled to:", newTheme === 1.0 ? "night" : "day");
    }
  }
);
</script>

<style scoped>
.canvas-container {
  position: fixed; /* Фиксированное позиционирование для фона */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent; /* Сделаем фон прозрачным */
  overflow: hidden;
  z-index: -1; /* Размещаем за другими элементами */
}
</style>
