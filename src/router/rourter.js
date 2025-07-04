import { createMemoryHistory, createRouter } from 'vue-router'
import Home from "@/components/HomePage/Home.vue";
import navigation from "@/components/Part/CommomHeader.vue";

const routes = [
    {
        path: '/',
        name:"Home",
        component: () => import("@/components/HomePage/Home.vue"),
        redirect: "/user",
        children:[
            {
                path: 'Home1',
                name: "Home1",
                component: () => import("@/components/Body/home.vue"),
            },
            {
                path: 'user',
                name: "user",
                component: () => import("@/components/Body/OptionSelect.vue"),
            }
        ]
    },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router