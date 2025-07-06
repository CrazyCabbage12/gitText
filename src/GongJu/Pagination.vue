<template>
  <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
  />
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const currentPage = ref(1); // 当前页码
const pageSize = ref(10); // 每页显示的条数
const totalData = ref(0); // 总数据量
const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["update:currentPage", "update:pageSize", "pagination"]);

const handleSizeChange = (newSize) => {
  emit("update:pageSize", newSize);
  emit("pagination", props.currentPage, newSize);
};

const handleCurrentChange = (newPage) => {
  emit("update:currentPage", newPage);
  emit("pagination", newPage, props.pageSize);
};
</script>