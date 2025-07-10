<script setup>
import { ref, computed } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from "@/stores/index.js";

const router = useRouter();

const list = ref([
  {
    path: '/',
    name: 'Dashboard',
    label: '首页',
    icon: 'house',
  },
  {
    path: '/UserManagement',
    name: 'UserManagement',
    label: '也许留言',
    icon: 'ShoppingCart',
  },
  {
    path: '/ProductManagement',
    name: 'ProductManagement',
    label: '用户管理',
    icon: 'user',
  },
  {
    path: '/tools',
    name: 'Tools',
    label: '小工具',
    icon: 'Compass',
    children: [
      {
        path: '/tools/map',
        name: 'Map',
        label: '地图',
        icon: 'Location'
      },
      {
        path: '/tools/echart',
        name: 'Echart',
        label: 'Echart',
        icon: 'CreditCard'
      }
    ]
  },
  {
    path: '/donate',
    name: 'Donate',
    label: '打赏',
    icon: 'Coin',
  },
]);

const nochilden = computed(() => list.value.filter(item => !item.children));
const haschilden = computed(() => list.value.filter(item => item.children));

const store = useStore();
const isCollaps = computed(() => store.state.isCollapse);
const width = computed(() => store.state.isCollapse ? '64px' : '180px');

const GotoPath = (path) => {
  router.push(path);
};
</script>

<template>
  <el-aside :width="width">
    <el-menu
        background-color="#545c64"
        text-color="#fff"
        :collapse="isCollaps"
    >
      <h3 v-show="!isCollaps">卷心菜个人工具箱</h3>
      <h3 v-show="isCollaps">工具箱</h3>
      <el-menu-item
          v-for="item in nochilden"
          :index="item.path"
          :key="item.path"
          @click="GotoPath(item.path)"
      >
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>

      <el-sub-menu
          v-for="item in haschilden"
          :index="item.path"
          :key="item.path"
      >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item
            v-for="(subItem, subIndex) in item.children"
            :index="subItem.path"
            :key="subIndex"
            @click="GotoPath(subItem.path)"
        >
          <component class="icons" :is="subItem.icon"></component>
          <span>{{ subItem.label }}</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<style scoped lang="less">
.icons {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}

.el-menu {
  border-right: none;

  h3 {
    line-height: 38px;
    color: #fff;
    text-align: center;
  }
}

.el-aside {
  height: 100%;
  background: #545c64;
}
</style>