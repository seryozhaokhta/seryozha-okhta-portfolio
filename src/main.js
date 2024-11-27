// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import i18n from './i18n';

// Импортируем разделённые CSS файлы в правильном порядке
import './styles/variables.css'; // CSS-переменные должны быть первыми
import './styles/base.css';
import './styles/typography.css';
import './styles/header.css';
import './styles/footer.css';

createApp(App)
    .use(i18n)
    .mount('#app');
