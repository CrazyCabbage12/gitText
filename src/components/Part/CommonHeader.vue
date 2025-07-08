<script setup>
import {ref,computed} from 'vue'
import {useRouter} from "vue-router";
import {useStore} from "@/stores/index.js";
const router = useRouter();
const getImageUrl = (user)=>{
  return new  URL(`../assets/images/user.jpg`,import.meta.url).href;
}

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

const store = useStore()
const handleCollapse = ()=>{
  store.state.isCollapse = !store.state.isCollapse
}
const handleLogout = () => {
  // 清除用户的登录状态
  store.logout();

  // 重定向到登录页面
  router.push('/login');
};
</script>

<template>
  <div class="header">
    <div class="left-container">
      <el-button size="small" @click="handleCollapse">
        <component class="icons" is="menu">small</component>
      </el-button>
          <el-breadcrumb separator="/" class="el-breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          </el-breadcrumb>
    </div>
    <div class="right-container">
      <el-dropdown>
          <span class="el-dropdown-link">
              <img :src="getImageUrl(user)" class="user-img" />
          </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="less">
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #333;
}
.icons{
  height: 20px;
  width: 20px;
}
.left-container{
  display: flex;
  align-items: center;
  .el-button{
    margin-right: 10px;
  }
}
.right-container{
  .user-img{
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
}
//样式穿透
:deep(.el-breadcrumb span){
  color: #fff !important;
  cursor: pointer !important;
}
</style>