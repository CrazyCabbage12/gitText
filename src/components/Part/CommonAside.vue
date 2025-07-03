<script setup>
import {ref,computed} from 'vue'
import {useRouter} from "vue-router";
import {useStore} from "@/stores/index.js";
const router = useRouter();


const list=ref([
  {
    path:'/home',
    name:'home',
    label:'首页',
    icon: 'house',
    url:'Home',
  },  {
    path:'/gmail',
    name:'gmail',
    label:'商品管理',
    icon: 'house',
    url:'gmail',
  },
  {
    path:'/user',
    name:'user',
    label:'首页',
    icon: 'user',
    url:'user',
  },
  {
    path:'/other',
    name:'other',
    label:'小工具',
    icon: 'other',
    childen:[
      {
        path:'/page1',
        name:'page1',
        label:'地图',
        icon: 'house'
      },
      {
        path:'/page2',
        name:'page2',
        label:'echart',
        icon: 'page2'
      }
    ]
  },
])

const nochilden = computed(()=>list.value.filter(item=>!item.childen))
const haschilden = computed(()=>list.value.filter(item=>item.childen))



const store = useStore();
const isCollaps = computed(()=>store.state.isCollapse)
const width = computed(()=>store.state.isCollapse ? '64px' : '180p')
const GotoPath = (path)=>{
  router.push(path)
}
</script>

<template>
  <el-aside width="width">
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
          >
              <component class="icons" :is="item.icon"></component>
            <span>{{item.label }}</span>
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
              <el-menu-item-group>
                <el-menu-item
                    v-for="(subItem,subIndex) in item.childen"
                    :index="subItem.path"
                    :key="subItem.path"
                >
                <component class="icons" :is="subItem.icon"></component>
                <span>{{subItem.label }}</span>
                  </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
  </el-aside>
</template>

<style scoped lang="less">
.icons{
  width: 18px;
  height: 18px;
  margin-right: 5px;
}
.el-menu{
  border-right: none;
  h3{
    line-height: 38px;
    color: #fff;
    text-align: center;
  }
}
.el-aside{
   height: 100%;
  background: #545c64;
}
</style>