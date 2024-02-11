import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from "pinia";
import router from "@/router/index.js";
import vuetify from "@/plugins/vuetify.js";

const app = createApp(App)
app.use(createPinia()).use(router).use(vuetify)
app.mount("#app")
