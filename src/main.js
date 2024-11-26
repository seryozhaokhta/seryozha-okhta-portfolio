// src/main.js

import { createApp } from 'vue';
import './styles.css';
import App from './App.vue';
import i18n from './i18n'; // Импортируем i18n

createApp(App)
    .use(i18n) // Используем i18n
    .mount('#app');

