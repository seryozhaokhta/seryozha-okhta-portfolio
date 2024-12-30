// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./i18n";
import router from "./router";

import "./styles/variables.css";
import "./styles/base.css";
import "./styles/typography.css";
import "./styles/gui.css";

import lazy from "./directives/lazy";

const app = createApp(App);
app.use(i18n);
app.use(router);
app.directive("lazy", lazy);
app.mount("#app");
