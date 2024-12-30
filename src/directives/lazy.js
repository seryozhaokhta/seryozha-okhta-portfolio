// src/directives/lazy.js
export default {
    mounted(el, binding) {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        };

        const callback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (binding.arg === "background") {
                        el.style.backgroundImage = `url(${binding.value})`;
                    } else {
                        el.src = binding.value;
                        // Обработчик ошибки
                        el.onerror = () => {
                            el.src = binding.valueFallback || '';
                        };
                    }
                    observer.unobserve(el);
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);
        observer.observe(el);

        // Observer в элементе для очистки
        el.__vueLazyObserver__ = observer;
    },
    unmounted(el) {
        if (el.__vueLazyObserver__) {
            el.__vueLazyObserver__.disconnect();
            delete el.__vueLazyObserver__;
        }
    },
};
