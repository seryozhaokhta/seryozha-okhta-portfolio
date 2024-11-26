// src/composables/useShaderGUI.js

import { onMounted, onBeforeUnmount } from "vue";
import * as dat from "dat.gui";

export function useShaderGUI(params, onUpdate, container) {
    let gui = null;

    onMounted(() => {
        if (!container.value) {
            console.error("Контейнер для dat.GUI не найден");
            return;
        }

        gui = new dat.GUI({ autoPlace: false });

        // Добавление контролов для параметров, исключая 'randomizeC'
        Object.keys(params).forEach((key) => {
            if (key !== "randomizeC") {
                if (key.startsWith("c")) {
                    // Для контролируемых c's добавляем ползунки с определёнными диапазонами
                    gui
                        .add(params, key, -2, 2)
                        .name(`c[${key.slice(1)}]`)
                        .onChange((value) => {
                            onUpdate(key, value);
                        });
                } else {
                    // Для остальных параметров определяем диапазоны
                    let min, max, step;
                    if (key === "noctaves") {
                        min = 1;
                        max = 12;
                        step = 1;
                    } else if (key === "smoothstepLow" || key === "smoothstepHigh") {
                        min = 0;
                        max = 1;
                        step = 0.01;
                    } else if (key === "colorExponent") {
                        min = 0.1;
                        max = 5;
                        step = 0.1;
                    } else {
                        min = 0;
                        max = 1;
                        step = 0.01;
                    }
                    gui
                        .add(params, key, min, max, step)
                        .name(key)
                        .onChange((value) => {
                            onUpdate(key, value);
                        });
                }
            }
        });

        // Добавление кнопки рандомизации
        gui.add(params, "randomizeC").name("Рандомизировать c");

        // Добавляем GUI в переданный контейнер
        container.value.appendChild(gui.domElement);
    });

    onBeforeUnmount(() => {
        if (gui) {
            gui.destroy();
        }
    });

    return {
        gui,
    };
}
