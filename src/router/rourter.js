import { createMemoryHistory, createRouter } from 'vue-router'
import Home from "@/components/HomePage/Home.vue";
import navigation from "@/components/HomePage/navigation.vue";


const routes = [
    { path: '/',name:Home, component: Home },
    { path: '/navigation',name:navigation, component: navigation },

]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router