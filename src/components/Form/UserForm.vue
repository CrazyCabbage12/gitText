<template>
  <el-dialog
      :title="title"
      v-model="dialogVisible"
      width="30%"
  >
    <el-form :model="formData" ref="formRef" :rules="rules">
      <el-form-item
          v-for="item in fields"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
      >
        <el-input v-model="formData[item.prop]" placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref, defineProps, defineEmits, watch} from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: "新增用户",
  },
  fields: {
    type: Array,
    required: true,
  },
  visible: {
    type: Boolean,
    default: false,
  },
  editMode: {
    type: Boolean,
    default: false,
  },
  editData: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:visible', 'submit']);

const dialogVisible = ref(false);
const formData = ref({});
const formRef = ref(null);

const rules = {
  name: [
    {required: true, message: '请输入姓名', trigger: 'blur'},
  ],
  address: [
    {required: true, message: '请输入地址', trigger: 'blur'},
  ],
  // 其他字段的规则
};

watch(() => props.visible, (newVal) => {
  dialogVisible.value = newVal;
  if (props.editMode && props.editData) {
    formData.value = {...props.editData};
  } else {
    formData.value = {};
  }
});

const closeDialog = () => {
  emit('update:visible', false);
};

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      emit('submit', formData.value);
      closeDialog();
    } else {
      console.error('表单验证失败');
    }
  });
};
</script>