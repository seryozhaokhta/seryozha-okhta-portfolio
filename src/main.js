// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import i18n from './i18n';
import router from './router'; // Импортируем маршрутизатор

// Импортируем разделённые CSS файлы в правильном порядке
import './styles/variables.css'; // CSS-переменные должны быть первыми
import './styles/base.css';
import './styles/typography.css';
import './styles/gui.css'; // Импортируем кастомные стили для dat.GUI

createApp(App)
    .use(i18n)
    .use(router) // Используем маршрутизатор
    .mount('#app');
