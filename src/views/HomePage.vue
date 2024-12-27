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

// dat.GUI handler
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
