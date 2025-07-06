import { createMemoryHistory, createRouter } from 'vue-router'
import Home from "@/components/HomePage/Home.vue";
import main from "@/components/Body/main.vue"
import OptionSelect from "@/components/Body/OptionSelect.vue"

const routes = [
    {
        path: '/',
        name: "Home",
        component: Home,
        children: [
            {
                path: '',
                name: "HomeDefault",
                component: () => import("@/components/Body/main.vue"), // 默认加载的内容
            },
            {
                path: 'Home1',
                name: "Home1",
                component: () => import("@/components/Body/main.vue"),
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