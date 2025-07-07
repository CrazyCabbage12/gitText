import { createMemoryHistory, createRouter } from 'vue-router';
import Dashboard from "@/components/HomePage/main.vue";
import ProductManagement from "@/components/Body/ProductManagement.vue";
import UserManagement from "@/components/Body/UserManagement.vue";
import Echart from "@/components/Body/Echart.vue";
import Donate from "@/components/Body/Donate.vue";
import Home  from "@/components/Body/Home.vue"
import Map from "@/components/Body/Map.vue"

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
                path: 'UserManagement',
                name: "UserManagement",
                component: UserManagement,
            },
            {
                path: 'ProductManagement',
                name: "ProductManagement",
                component: ProductManagement,
            },
            {
                path: 'tools',
                name: "Tools",
                children: [
                    {
                        path: 'map',
                        name: "Map",
                        component: Map,
                    },
                    {
                        path: 'Echart',
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