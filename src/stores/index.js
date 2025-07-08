import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

// 初始化状态的函数
function initState() {
    return {
        isCollapse: false, // 侧边栏是否折叠
        user: null, // 当前用户信息
        token: null, // 用户登录 token
    };
}

// 定义 Pinia store
export const useStore = defineStore('StoreData', () => {
    // 定义响应式状态
    const state = ref(initState());

    // 定义 getters（计算属性）
    const isSidebarCollapsed = computed(() => state.value.isCollapse);
    const isLoggedIn = computed(() => !!state.value.token); // 如果 token 存在，则认为用户已登录
    const currentUser = computed(() => state.value.user);

    // 定义 actions（方法）
    function setUser(user) {
        state.value.user = user;
    }

    function setToken(token) {
        state.value.token = token;
    }

    function login(user, token) {
        setUser(user);
        setToken(token);
    }

    function logout() {
        setUser(null);
        setToken(null);
    }

    // 返回状态、getters 和 actions
    return {
        state,
        isSidebarCollapsed,
        isLoggedIn,
        currentUser,
        setUser,
        setToken,
        login,
        logout,
    };
});