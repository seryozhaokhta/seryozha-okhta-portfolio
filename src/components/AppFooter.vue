<!-- src/components/AppFooter.vue -->

<template>
  <footer class="footer">
    <p>{{ $t("footer.text") }}</p>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer {
  width: 100%;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  color: #ffffff;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  /* box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.3); */
}
</style>
