<template>
  <div class="container">
    <h1>留言词云</h1>

    <div class="content-wrapper">
      <!-- 左侧：留言输入和列表 -->
      <div class="left-panel">
        <div class="message-form">
          <input
              v-model="nickname"
              placeholder="请输入你的昵称"
              style="width: 150px;"
          />
          <input
              v-model="newMessage"
              @keyup.enter="addMessage"
              placeholder="请输入你的留言..."
              style="flex: 1;"
          />
          <button @click="addMessage">提交</button>
        </div>

        <!-- 提示信息 -->
        <div class="message-tip">
          💡 您的每一句话都是我珍贵的收藏，网络传输较慢，您的留言可能需要大约5秒才能加载。
        </div>

        <div class="message-list">
          <h2>留言列表</h2>
          <ul>
            <li v-for="(msg, index) in paginatedMessages" :key="index">
              <strong>{{ msg.nickname }}：</strong>{{ msg.content }}
            </li>
          </ul>

          <!-- Element Plus 分页组件 -->
          <el-pagination
              v-model:current-page="currentPage"
              :page-size="pageSize"
              :total="totalMessages"
              layout="prev, pager, next"
              @current-change="handlePageChange"
          />
        </div>
      </div>

      <!-- 右侧：词云图 -->
      <div class="right-panel">
        <h2>词云图</h2>
        <div class="word-cloud-placeholder">
          <div id="main" style="width: 100%; height: 400px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import request from '@/api/request.js'
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts';
import 'echarts-wordcloud';
// 分页相关
const currentPage = ref(1)
const pageSize = 5
const totalMessages = ref(0)

// 留言相关
const nickname = ref('')
const newMessage = ref('')
const messages = ref([])
const paginatedMessages = ref([])

// 添加留言
const addMessage = async () => {
  const text = newMessage.value.trim()
  const name = nickname.value.trim() || '匿名用户'

  if (!text) {
    ElMessage.warning('留言内容不能为空')
    return
  }

  try {
    const res = await request({
      url: 'http://localhost:8888/message/save',
      method: 'post',
      data: {
        nickname: name,
        content: text
      }
    })

    if (res.code === 200) {
      ElMessage.success('留言成功')
      newMessage.value = ''
      nickname.value = ''
      currentPage.value = 1
      loadMessages()
    } else {
      ElMessage.error('留言失败：' + res.msg)
    }
  } catch (error) {
    console.error('留言请求失败', error)
    ElMessage.error('请求失败，请检查后端是否启动')
  }
}

// 加载留言列表
const loadMessages = async () => {
  try {
    const res = await request({
      url: 'http://47.98.200.187:9999/message/list',
      method: 'get'
    })

    if (res.code === 200) {
      messages.value = res.data.reverse() // 最新的在前面
      totalMessages.value = messages.value.length
      updatePaginatedMessages();
      WordCloud();
    } else {
      ElMessage.error('加载留言失败：' + res.msg)
    }
  } catch (error) {
    console.error('加载留言失败', error)
    ElMessage.error('请求失败，请检查后端是否启动')
  }
}

// 更新分页数据
const updatePaginatedMessages = () => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  paginatedMessages.value = messages.value.slice(start, end)
}

const WordCloud = () => {
  const chart = echarts.init(document.getElementById('main'));

  const allText = messages.value.map(msg => msg.content).join(' ');
  const words = allText
      .replace(/[，。！？、；：""''（）【】《》\s]/g, ' ')
      .split(' ')
      .filter(word => word.trim().length > 1);

  const wordFreq = {};
  words.forEach(word => {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  });

  const wordCloudData = Object.entries(wordFreq).map(([name, value]) => ({
    name,
    value
  }));

  chart.setOption({
    series: [{
      type: 'wordCloud',
      shape: 'circle',
      left: 'center',
      top: 'center',
      width: '70%',
      height: '80%',
      sizeRange: [12, 60],
      rotationRange: [-90, 90],
      rotationStep: 45,
      gridSize: 8,
      drawOutOfBound: false,
      layoutAnimation: true,
      textStyle: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        color: function () {
          return 'rgb(' + [
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160)
          ].join(',') + ')';
        }
      },
      emphasis: {
        focus: 'self',
        textStyle: {
          textShadowBlur: 10,
          textShadowColor: '#333'
        }
      },
      data: wordCloudData
    }]
  });
};


// 分页切换
const handlePageChange = (page) => {
  currentPage.value = page
  updatePaginatedMessages()
}

// 页面加载时调用
onMounted(() => {
  loadMessages();
})
</script>

<style scoped lang="less">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Helvetica Neue', sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.content-wrapper {
  display: flex;
  gap: 40px;
}

.left-panel {
  flex: 1;
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.message-form {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;

  input {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #369870;
    }
  }
}

.message-list {
  margin-bottom: 40px;

  ul {
    list-style: none;
    padding: 0;

    li {
      background-color: #f9f9f9;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 4px;
      border-left: 4px solid #42b983;
    }
  }
}

.word-cloud-placeholder {
  flex: 1;
  display: flex;
  flex-direction: column;

  .placeholder {
    flex: 1;
    min-height: 400px;
    background-color: #f0f0f0;
    border: 2px dashed #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-size: 18px;
    border-radius: 8px;
  }
}

.message-tip {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
  background-color: #f9f9f9;
  padding: 10px;
  border-left: 4px solid #42b983;
  border-radius: 4px;
}
</style>