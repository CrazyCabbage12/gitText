import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/rourter.js";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "@/assets/css/index.scss"
import {createPinia} from "pinia";
import "@/assets/css/font/font.css"
import  "@/api/mock.js";

const app = createApp(App)
const  pinia = createPinia();
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router).use(ElementPlus).use(pinia).mount('#app')
