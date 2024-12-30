<!-- src/components/FullscreenOverlay.vue -->
<template>
  <div class="fullscreen-overlay" @click.self="close">
    <!-- Кнопка Закрыть -->
    <button class="fullscreen-overlay__close" @click="close">✕</button>

    <div class="fullscreen-overlay__content">
      <!-- YouTube-видео -->
      <div
        v-if="item.type === 'youtube'"
        class="fullscreen-media fullscreen-media--youtube"
      >
        <iframe
          :src="item.src"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>

      <!-- Изображение/gif/video -->
      <img
        v-else-if="item.type === 'image' || item.type === 'gif'"
        :src="item.src"
        :alt="item.alt"
        class="fullscreen-media"
      />
      <video
        v-else-if="item.type === 'video'"
        class="fullscreen-media"
        controls
        autoplay
        muted
        playsinline
        preload="metadata"
      >
        <source :src="item.src" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>

<style scoped>
.fullscreen-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fullscreen-overlay__close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #fff;
  font-size: 28px;
  cursor: pointer;
  z-index: 1000; /* чтобы крестик был выше контента */
}

.fullscreen-overlay__content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Медиа для фуллскрин */
.fullscreen-media {
  border: none;
  object-fit: contain;
  object-position: center;
  margin: 0 auto;
  max-width: 90%;
  max-height: 90%;
}

/* Специфические стили для YouTube в фуллскрин */
.fullscreen-media--youtube {
  aspect-ratio: 16 / 9;
  width: 80%;
  height: auto;
}
.fullscreen-media--youtube iframe {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
</style>
