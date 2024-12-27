// src/composables/useTheme.js
import { ref } from "vue";
import { gsap } from "gsap";

const themeValue = ref(0.0);

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "night") {
    themeValue.value = 1.0;
} else {
    themeValue.value = 0.0;
}

const toggleTheme = () => {
    const newTarget = themeValue.value === 0.0 ? 1.0 : 0.0;
    const newName = newTarget === 1.0 ? "night" : "day";

    const obj = { value: themeValue.value };
    gsap.to(obj, {
        duration: 0.5,
        value: newTarget,
        ease: "power1.inOut",
        onUpdate: () => {
            themeValue.value = obj.value;
        },
        onComplete: () => {
            localStorage.setItem("theme", newName);
        },
    });
};

export function useTheme() {
    return {
        themeValue,
        toggleTheme,
    };
}
