// src/composables/useTheme.js

import { ref, watch } from "vue";
import { gsap } from "gsap";

// Создаем общий реф для themeValue
const themeValue = ref(0.0); // 0.0 - день, 1.0 - ночь

// Инициализация темы из localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'night') {
    themeValue.value = 1.0;
} else {
    themeValue.value = 0.0;
}

// Функция для переключения темы с анимацией
const toggleTheme = () => {
    const target = themeValue.value === 0.0 ? 1.0 : 0.0;
    const targetName = target === 1.0 ? 'night' : 'day';

    // Создаем временный объект для анимации
    const obj = { value: themeValue.value };

    gsap.to(obj, {
        duration: 0.5,
        value: target,
        ease: "power1.inOut",
        onUpdate: () => {
            themeValue.value = obj.value;
        },
        onComplete: () => {
            localStorage.setItem('theme', targetName);
        }
    });
};

// Watcher для themeValue, чтобы обновлять localStorage при изменении
watch(themeValue, (newVal) => {
    const themeName = newVal >= 0.5 ? 'night' : 'day';
    localStorage.setItem('theme', themeName);
});

export function useTheme() {
    return {
        themeValue,
        toggleTheme,
    };
}
