<!-- src/components/AppFooter.vue -->

<template>
  <div class="app-footer">
    <button
      class="app-footer__email-button"
      @click="copyToClipboard($t('footer.email'))"
    >
      <img
        class="app-footer__copy-icon"
        src="@/assets/to_copy.svg"
        alt="Copy"
      />
      <span class="app-footer__email-text" ref="emailText">{{
        $t("footer.email")
      }}</span>
    </button>
    <div class="app-footer__social-links">
      <a
        href="https://github.com/yourusername"
        class="app-footer__social-link"
        target="_blank"
        rel="noopener"
      >
        <img
          src="@/assets/github.svg"
          alt="Github"
          class="app-footer__social-icon"
        />
      </a>
      <a
        href="https://linkedin.com/in/yourusername"
        class="app-footer__social-link"
        target="_blank"
        rel="noopener"
      >
        <img
          src="@/assets/linkedin.svg"
          alt="LinkedIn"
          class="app-footer__social-icon"
        />
      </a>
      <a
        href="https://youtube.com/yourchannel"
        class="app-footer__social-link"
        target="_blank"
        rel="noopener"
      >
        <img
          src="@/assets/youtube.svg"
          alt="YouTube"
          class="app-footer__social-icon"
        />
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const emailText = ref(null);

const copyToClipboard = (email) => {
  navigator.clipboard
    .writeText(email)
    .then(() => {
      if (emailText.value) {
        emailText.value.textContent = t("footer.copy");
        setTimeout(() => {
          if (emailText.value) {
            emailText.value.textContent = email;
          }
        }, 2000);
      }
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
    });
};
</script>

<style scoped>
.app-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--footer-background);
  color: var(--text-color);
  padding: 20px;
  border-top: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
}

.app-footer__email-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  font: inherit;
  padding: 0;
}

.app-footer__copy-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.app-footer__social-links {
  display: flex;
  gap: 10px;
}

.app-footer__social-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.app-footer__social-icon {
  width: 24px;
  height: 24px;
  transition: opacity 0.3s;
}

.app-footer__social-link:hover .app-footer__social-icon {
  opacity: 0.7;
}
</style>
