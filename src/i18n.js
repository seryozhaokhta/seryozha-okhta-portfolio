// src/i18n.js
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import ru from './locales/ru.json';
import cvEn from './locales/cv_en.json';
import cvRu from './locales/cv_ru.json';

const messages = {
    en: {
        ...en,
        cv: cvEn
    },
    ru: {
        ...ru,
        cv: cvRu
    },
};

const savedLocale = localStorage.getItem('locale') || 'en';

const i18n = createI18n({
    legacy: false, // используем Composition API
    locale: savedLocale,
    fallbackLocale: 'en',
    messages,
});

export default i18n;
