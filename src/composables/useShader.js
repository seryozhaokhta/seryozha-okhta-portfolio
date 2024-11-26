// src/composables/useShader.js

import { reactive } from "vue";

export function useShader() {
    // Определяем все используемые индексы c
    const controlledIndices = [0, 1, 2, 3, 5, 6, 8, 9, 10, 11, 12];
    const NUM_C = 13; // Размер массива c

    // Дефолтные значения для c0 до c12
    const defaultC = {
        c0: 0.0,
        c1: 0.0,
        c2: 0.0,
        c3: 0.0,
        c5: 0.0,
        c6: 0.0,
        c8: 0.0,
        c9: 0.0,
        c10: -2.0,
        c11: 0.0,
        c12: 0.0,
    };

    // Инициализация массива c
    const c = [];
    for (let i = 0; i < NUM_C; i++) {
        if (controlledIndices.includes(i)) {
            c[i] = defaultC[`c${i}`];
        } else {
            // Для c4 и c7, которые не используются в шейдере, устанавливаем 0
            c[i] = 0.0;
            // Не добавляем c4 и c7 в params
        }
    }

    // Функция обновления параметров
    const updateParam = (key, value) => {
        if (key.startsWith("c")) {
            const index = parseInt(key.slice(1), 10);
            if (controlledIndices.includes(index)) {
                c[index] = value;
            }
        }
        params[key] = value;
    };

    // Функция рандомизации контролируемых c's
    const randomizeC = () => {
        controlledIndices.forEach((i) => {
            c[i] = Math.random() * 2 - 1;
            params[`c${i}`] = c[i];
        });
    };

    // Обработчик для кнопки рандомизации
    const handleUpdate = (key, value) => {
        if (key === "randomizeC") {
            randomizeC();
        } else {
            updateParam(key, value);
        }
    };

    // Инициализация параметров, включая контролируемые c's
    const params = reactive({
        noctaves: 4,
        smoothstepLow: 0.1,
        smoothstepHigh: 1.0,
        colorExponent: 2.0,
        // Инициализируем только используемые c's
        ...defaultC,
        randomizeC: () => {
            handleUpdate("randomizeC");
        },
    });

    return {
        params,
        c,
        randomizeC,
        updateParam,
    };
}
