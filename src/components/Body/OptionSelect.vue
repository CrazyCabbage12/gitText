<script setup>
import { ref, getCurrentInstance, onMounted, reactive } from "vue";

const config = reactive({
  name: "",
});

const handleClick = () => {};

const { proxy } = getCurrentInstance();

const GetUserData = async () => {
  const allData = await proxy.$api.GetUserData(); // 获取所有数据
  console.log("All Data from Mock:", allData);

  // 更新总数据量
  totalData.value = allData.tableData.length;

  // 如果 config.name 有值，则进行筛选
  let filteredData = allData.tableData;
  if (config.name) {
    filteredData = filteredData.filter(item => {
      const value = item[selectedField.value] || ""; // 动态选择筛选字段
      return value.toLowerCase().includes(config.name.toLowerCase());
    });
  }

  // 更新总数据量（筛选后的数据量）
  totalData.value = filteredData.length;

  // 使用通用分页函数处理分页
  tableData.value = paginateData(filteredData, currentPage.value, pageSize.value);
};

const TableLable = reactive([
  {
    prop: "address",
    label: "地址",
  },
  {
    prop: "date",
    label: "日期",
  },
  {
    prop: "city",
    label: "城市",
  },
  {
    prop: "zip",
    label: "邮编",
  },
  {
    prop: "state",
    label: "州",
  },
  {
    prop: "name",
    label: "姓名",
  },
]);

onMounted(() => {
  GetUserData();
});

const ForeInilne = reactive({
  keyWord: "",
});

const selectedField = ref("name"); // 默认值为 "name"

const tableData = ref([]);
const currentPage = ref(1); // 当前页码
const pageSize = ref(10); // 每页显示的条数
const totalData = ref(0); // 总数据量

const HeadleSearch = () => {
  config.name = ForeInilne.keyWord;
  console.log("Search keyword:", config.name);
  GetUserData();
};

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage; // 更新当前页码
  GetUserData(); // 重新获取数据
};

const handleSizeChange = (newSize) => {
  pageSize.value = newSize; // 更新每页显示条数
  currentPage.value = 1; // 重置当前页码为第一页
  GetUserData(); // 重新获取数据
};

const paginateData = (data, currentPage, pageSize) => {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  return data.slice(start, end);
};
</script>

<template>
  <div class="option-select">
    <el-button type="default">新增</el-button>
    <div class="search-controls">
      <el-form :inline="true" :model="ForeInilne">
        <el-form-item label="筛选字段" class="input-button">
          <el-select v-model="selectedField" placeholder="请选择字段">
            <el-option
                v-for="item in TableLable"
                :key="item.prop"
                :label="item.label"
                :value="item.prop"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="请输入" class="input-button">
          <el-input placeholder="请输入内容" v-model="ForeInilne.keyWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="HeadleSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
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
          <el-button type="primary" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="pagination">
    <el-pagination
        v-model:currentPage="currentPage"
        v-model:pageSize="pageSize"
        :total="totalData"
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="mt-4"
    />
  </div>
</template>

<style scoped lang="less">
.option-select {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-controls {
  display: flex;
  align-items: center;
}

.input-button {
  margin-left: 10px;
}

.mt-4 {
  margin: auto;
}
</style>