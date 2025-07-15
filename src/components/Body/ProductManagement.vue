<template>
  <div class="option-select">
    <el-button type="primary" @click="openDialog">新增</el-button>
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
          <el-button type="success" @click="HeadleSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <div class="user-table">
    <el-table
        :data="tableData"
        style="width: 100%"
        border
        stripe
        row-class-name="table-row"
    >
      <el-table-column
          v-for="item in TableLable"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
      />
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default="scope">
          <el-button link type="danger" size="small" @click="handleDelete(scope.row)">
            删除
          </el-button>
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">
            编辑
          </el-button>
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

  <!-- 引入 UserForm 组件 -->
  <UserForm
      :title="formTitle"
      :fields="TableLable"
      v-model:visible="dialogVisible"
      @submit="handleFormSubmit"
      :editMode="editMode"
      :editData="editData"
  />
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, reactive } from "vue";
import UserForm from "@/components/Form/UserForm.vue"; // 引入 UserForm 组件

const { proxy } = getCurrentInstance();

const GetUserData = async () => {
  try {
    const allData = await proxy.$api.GetUserData();
    if (!allData || !allData.data || !allData.data.tableData) {
      console.error("Invalid data structure:", allData);
      return;
    }
    totalData.value = allData.data.tableData.length;
    tableData.value = paginateData(allData.data.tableData, currentPage.value, pageSize.value);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const TableLable = reactive([
  {prop: "address", label: "地址"},
  {prop: "date", label: "日期"},
  {prop: "city", label: "城市"},
  {prop: "zip", label: "邮编"},
  {prop: "state", label: "州"},
  {prop: "name", label: "姓名"},
]);

onMounted(() => {
  GetUserData();
});

const ForeInilne = reactive({keyWord: ""});
const selectedField = ref("name");
const tableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const totalData = ref(0);

const HeadleSearch = () => {
  GetUserData();
};

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
  GetUserData();
};

const handleSizeChange = (newSize) => {
  pageSize.value = newSize;
  currentPage.value = 1;
  GetUserData();
};

const paginateData = (data, currentPage, pageSize) => {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  return data.slice(start, end);
};

const dialogVisible = ref(false);
const formTitle = ref("新增用户");
const editMode = ref(false);
const editData = ref({});

const openDialog = () => {
  formTitle.value = "新增用户";
  editMode.value = false;
  dialogVisible.value = true;
};

const handleEdit = (row) => {
  formTitle.value = "编辑用户";
  editMode.value = true;
  editData.value = {...row};
  dialogVisible.value = true;
};

const handleDelete = async (row) => {
  try {
    const response = await proxy.$api.DeleteProductData({id: row.id});
    if (response && response.code === 200) {
      console.log("数据删除成功", response.message);
      GetUserData(); // 重新获取数据以更新表格
    } else {
      console.error("数据删除失败", response.message);
    }
  } catch (error) {
    console.error("删除数据时发生错误", error);
  }
};

const handleFormSubmit = async (formData) => {
  try {
    if (editMode.value) {
      const response = await proxy.$api.EditProductData(formData);
      if (response && response.code === 200) {
        console.log("数据更新成功", response.message);
      } else {
        console.error("数据更新失败", response.message);
      }
    } else {
      const response = await proxy.$api.AddProductData(formData);
      if (response && response.code === 200) {
        console.log("数据添加成功", response.message);
      } else {
        console.error("数据添加失败", response.message);
      }
    }
    GetUserData(); // 重新获取数据以更新表格
  } catch (error) {
    console.error("提交数据时发生错误", error);
  }
};
</script>

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

.user-table {
  margin-bottom: 20px;
}

.table-row {
  &:hover {
    background-color: #f0f9eb;
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.mt-4 {
  margin: auto;
}
</style>