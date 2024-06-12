import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "assets/style/main.css";
// 计算设置rem的基准值，即html的font-size
import "amfe-flexible";
// Toast
import "vant/es/toast/style";
// Dialog
import "vant/es/dialog/style";
// Notify
import "vant/es/notify/style";
// ImagePreview
import "vant/es/image-preview/style";
import store from "@/store";

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
