<script setup>
import {ref, getCurrentInstance, onMounted, reactive,} from "vue"




const config = reactive({
  name: "",
})
const handleClick = () => {
  console.log('click')
}
const {proxy} = getCurrentInstance()
const GetUserData = async () => {
  const data = await proxy.$api.GetUserData(config);
  console.log(data);
  tableData.value = data.tableData;
}

const TableLable = reactive([
  {
    prop: "address",
    label: '时间',
  },
  {
    prop: "date",
    label: '时间',
  },
  {
    prop: "city",
    label: '时间',
  },
  {
    prop: "zip",
    label: '时间',
  },
  {
    prop: "state",
    label: '时间',
  },
  {
    prop: "name",
    label: '时间',
  },
])

onMounted(()=>{
  GetUserData();
})

const ForeInilne = reactive({
  keyWord:'',
})

const tableData = ref([])
const HeadleSearch = ()=>{
  GetUserData()
}


</script>

<template>
<div class="option-select">
  <el-button type="default">新增</el-button>
  <el-form :inline="true" :model="ForeInilne">
    <el-form-item label="请输入" class="input-button">
      <el-input placeholder="请输入用户名" v-model="ForeInilne.keyWord"></el-input>
      <el-form-item>
        <el-button @click="HeadleSearch">搜索</el-button>
      </el-form-item>
    </el-form-item>
  </el-form>
</div>
  <div class="user-table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
          v-for="item in TableLable"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
      />
      <el-table-column fixed="right" label="Operations" min-width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick">
            删除
          </el-button>
          <el-button  type="primary" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="pagination">
    <el-pagination
        size="small"
        background
        layout="prev, pager, next"
        :total="50"
        class="mt-4"
    />
  </div>
</template>

<style scoped lang="less">
.option-select{
  display: flex;
  justify-content: space-between;
}
.mt-4{
  margin: auto;
}
</style>