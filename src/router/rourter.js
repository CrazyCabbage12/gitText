import {createMemoryHistory, createRouter, createWebHistory} from 'vue-router';
import Dashboard from "@/components/HomePage/main.vue";
import ProductManagement from "@/components/Body/ProductManagement.vue";
import UserManagement from "@/components/Body/UserManagement.vue";
import Echart from "@/components/Body/Echart.vue";
import Donate from "@/components/Body/Donate.vue";
import Home  from "@/components/Body/Home.vue"
import Map from "@/components/Body/Map.vue"
import Login from "@/components/Login/login.vue"
import { useRouter } from "vue-router";
import { useStore } from "@/stores/index.js";
import component from "@/components/Body/component.vue"

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
            },
            {
                path: 'component',
                name: "Component",
                component: component,
            }
        ]
    },
    {
        path: '/login',
        name: "login",
        component:Login ,
        meta: { requiresAuth: false }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const store = useStore();

    // 如果目标路由是登录页面，直接放行
    if (to.path === "/login") {
        next();
        return;
    }

    // 如果目标路由需要登录权限
    if (!store.state.token) {
        // 重定向到登录页面
        next({ path: '/login' });
    } else {
        // 否则正常跳转
        next();
    }
});

export default router;