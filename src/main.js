import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/rourter.js";

createApp(App).use(ElementPlus).use(router).mount('#app')
