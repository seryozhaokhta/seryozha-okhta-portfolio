// src/i18n.js

import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import ru from './locales/ru.json';

const messages = {
    en,
    ru,
};

const savedLocale = localStorage.getItem('locale') || 'en';

const i18n = createI18n({
    legacy: false, // Добавьте эту строку
    locale: savedLocale,
    fallbackLocale: 'en',
    messages,
});

export default i18n;
