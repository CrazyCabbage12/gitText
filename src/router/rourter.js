import { createMemoryHistory, createRouter } from 'vue-router';
import Dashboard from "@/components/HomePage/main.vue";
import ProductManagement from "@/components/Body/ProductManagement.vue";
import UserManagement from "@/components/Body/UserManagement.vue";
import Echart from "@/components/Body/Echart.vue";
import Donate from "@/components/Body/Donate.vue";
import Home  from "@/components/Body/Home.vue"

const routes = [
    {
        path: '/',
        name: "main",
        component: Dashboard,
        children: [
            {
                path: '',
                name: "Dashboard",
                component: Home,
            },
            {
                path: 'product-management',
                name: "ProductManagement",
                component: ProductManagement,
            },
            {
                path: 'user-management',
                name: "UserManagement",
                component: UserManagement,
            },
            {
                path: 'tools',
                name: "Tools",
                component: () => import("@/components/Body/Map.vue"),
                children: [
                    {
                        path: 'map',
                        name: "Map",
                        component: Map,
                    },
                    {
                        path: 'echart',
                        name: "Echart",
                        component: Echart,
                    }
                ]
            },
            {
                path: 'donate',
                name: "Donate",
                component: Donate,
            }
        ]
    }
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;