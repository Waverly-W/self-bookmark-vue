import { createApp } from "vue";
import DevUI from "vue-devui";
import "vue-devui/style.css";
import "@devui-design/icons/icomoon/devui-icon.css";
import { ThemeServiceInit } from "devui-theme";
import { themes } from './config/theme';
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// 初始化主题服务
ThemeServiceInit(themes, 'infinityTheme');

const app = createApp(App);
app.use(DevUI);
app.use(createPinia());
app.use(router);

app.mount("#app");
