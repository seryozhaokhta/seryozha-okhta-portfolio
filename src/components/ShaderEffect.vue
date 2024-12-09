<!-- src/components/ShaderEffect.vue -->

<template>
  <div class="shader-effect">
    <div ref="canvasContainer" class="shader-effect__canvas"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import p5 from "p5";
import fragShader from "../assets/shader.frag";
import vertShader from "../assets/shader.vert";

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

const canvasContainer = ref(null);
let shaderProgram = null;

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

    shaderProgram.setUniform("noctaves", props.params.noctaves);
    shaderProgram.setUniform("smoothstepLow", props.params.smoothstepLow);
    shaderProgram.setUniform("smoothstepHigh", props.params.smoothstepHigh);
    shaderProgram.setUniform("colorExponent", props.params.colorExponent);
    shaderProgram.setUniform("c", buildC());
    shaderProgram.setUniform("theme", props.theme);

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
    shaderProgram.setUniform("theme", props.theme);

    p.rect(-p.width / 2, -p.height / 2, p.width, p.height);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

onMounted(() => {
  new p5(sketch, canvasContainer.value);
});

watch(
  () => props.params,
  (newParams) => {
    if (shaderProgram) {
      shaderProgram.setUniform("noctaves", newParams.noctaves);
      shaderProgram.setUniform("smoothstepLow", newParams.smoothstepLow);
      shaderProgram.setUniform("smoothstepHigh", newParams.smoothstepHigh);
      shaderProgram.setUniform("colorExponent", newParams.colorExponent);
      shaderProgram.setUniform("c", buildC());
    }
  },
  { deep: true }
);

watch(
  () => props.theme,
  (newTheme) => {
    if (shaderProgram) {
      shaderProgram.setUniform("theme", newTheme);
      console.log("Theme toggled to:", newTheme === 1.0 ? "night" : "day");
    }
  }
);
</script>

<style scoped></style>
