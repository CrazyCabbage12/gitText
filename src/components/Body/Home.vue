<script setup>
import {onMounted, onUnmounted, ref, getCurrentInstance, nextTick, computed} from "vue";
import * as echarts from 'echarts';
import axios from "axios";
import { watch} from 'vue';

const {proxy} = getCurrentInstance()

// 响应式数据
const chart1Type = ref('line')
const expensePeriod = ref('month')
const currentTheme = ref('light') // 新增：主题控制

// 计划数据
const plans = ref([
  {
    id: 1,
    title: '完成项目文档',
    category: '工作',
    priority: 'high',
    completed: false,
    dueDate: '2025-07-15'
  },
  {
    id: 2,
    title: '健身计划',
    category: '健康',
    priority: 'medium',
    completed: true,
    dueDate: '2025-07-10'
  },
  {
    id: 3,
    title: '学习Vue3新特性',
    category: '学习',
    priority: 'high',
    completed: false,
    dueDate: '2025-07-20'
  },
  {
    id: 4,
    title: '整理照片',
    category: '生活',
    priority: 'low',
    completed: true,
    dueDate: '2025-07-08'
  }
])

// 图表实例
const echartInstance1 = ref(null);
const echartInstance2 = ref(null);
const miniChartInstance = ref(null);

// 主题配置
const themes = {
  light: {
    backgroundColor: '#ffffff',
    textColor: '#333333',
    borderColor: '#e0e0e0',
    primaryColor: '#6e8efb',
    chartTheme: 'light'
  },
  dark: {
    backgroundColor: '#1a1a1a',
    textColor: '#ffffff',
    borderColor: '#333333',
    primaryColor: '#9c27b0',
    chartTheme: 'dark'
  },
  blue: {
    backgroundColor: '#f0f8ff',
    textColor: '#0066cc',
    borderColor: '#b3d9ff',
    primaryColor: '#0066cc',
    chartTheme: 'light'
  }
}

// 当前主题配置
const currentThemeConfig = computed(() => themes[currentTheme.value])

// 初始化迷你图表
const initMiniChart = () => {
  const chartDom = document.getElementById('miniChart1');
  if (!chartDom) return;

  miniChartInstance.value = echarts.init(chartDom, currentThemeConfig.value.chartTheme);
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        fontSize: 12,
        color: currentThemeConfig.value.textColor
      }
    },
    series: [
      {
        name: '计划分布',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: currentThemeConfig.value.backgroundColor,
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '12',
            fontWeight: 'bold',
            color: currentThemeConfig.value.textColor
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: plans.value.filter(p => p.category === '工作').length, name: '工作' },
          { value: plans.value.filter(p => p.category === '学习').length, name: '学习' },
          { value: plans.value.filter(p => p.category === '健康').length, name: '健康' },
          { value: plans.value.filter(p => p.category === '生活').length, name: '生活' }
        ]
      }
    ]
  };

  miniChartInstance.value.setOption(option);
};

// 更新图表1
const updateChart1 = () => {
  if (!echartInstance1.value) return;

  const isLine = chart1Type.value === 'line';
  const option = {
    backgroundColor: currentThemeConfig.value.backgroundColor,
    title: {
      text: '',
      textStyle: {
        color: currentThemeConfig.value.textColor
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['已完成', '新增'],
      textStyle: {
        color: currentThemeConfig.value.textColor
      }
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLine: {
        lineStyle: {
          color: currentThemeConfig.value.borderColor
        }
      },
      axisLabel: {
        color: currentThemeConfig.value.textColor
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: currentThemeConfig.value.borderColor
        }
      },
      axisLabel: {
        color: currentThemeConfig.value.textColor
      },
      splitLine: {
        lineStyle: {
          color: currentThemeConfig.value.borderColor
        }
      }
    },
    series: [
      {
        name: '已完成',
        type: isLine ? 'line' : 'bar',
        smooth: isLine,
        data: [5, 8, 7, 9, 6, 8, 10],
        itemStyle: {
          color: currentThemeConfig.value.primaryColor
        }
      },
      {
        name: '新增',
        type: isLine ? 'line' : 'bar',
        smooth: isLine,
        data: [3, 5, 2, 6, 4, 5, 3],
        itemStyle: {
          color: '#ff7043'
        }
      }
    ]
  };

  echartInstance1.value.setOption(option);
};

// 初始化图表1
const initChart1 = () => {
  const chartDom = document.getElementById('main1');
  if (!chartDom) return;

  echartInstance1.value = echarts.init(chartDom, currentThemeConfig.value.chartTheme);
  updateChart1();
};

// 初始化图表2
const initChart2 = () => {
  const chartDom = document.getElementById('main2');
  if (!chartDom) return;

  echartInstance2.value = echarts.init(chartDom, currentThemeConfig.value.chartTheme);
  const option = {
    backgroundColor: currentThemeConfig.value.backgroundColor,
    title: {
      text: '',
      textStyle: {
        color: currentThemeConfig.value.textColor
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        color: currentThemeConfig.value.textColor
      }
    },
    series: [
      {
        name: '时间分配',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 35, name: '工作' },
          { value: 20, name: '学习' },
          { value: 15, name: '健康' },
          { value: 30, name: '生活' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  echartInstance2.value.setOption(option);
};

// 监听图表类型变化
watch(chart1Type, updateChart1);

// 监听主题变化
watch(currentTheme, () => {
  nextTick(() => {
    initChart1();
    initChart2();
    initMiniChart();
  });
});

// 在组件挂载时初始化
onMounted(() => {
  nextTick(() => {
    initChart1();
    initChart2();
    initMiniChart();
  });
});

// 窗口大小变化时重新调整图表大小
window.addEventListener('resize', () => {
  echartInstance1.value?.resize();
  echartInstance2.value?.resize();
  miniChartInstance.value?.resize();
});

// 计划相关方法
const togglePlanStatus = (plan) => {
  plan.completed = !plan.completed;
  nextTick(() => {
    initMiniChart();
  });
};

const getPriorityClass = (priority) => {
  return {
    'priority-high': priority === 'high',
    'priority-medium': priority === 'medium',
    'priority-low': priority === 'low'
  };
};

const completedPlans = computed(() => plans.value.filter(p => p.completed));
const pendingPlans = computed(() => plans.value.filter(p => !p.completed));
</script>

<template>
  <div class="home-container" :style="{ backgroundColor: currentThemeConfig.backgroundColor, color: currentThemeConfig.textColor }">
    <!-- 顶部欢迎区域 -->
    <div class="welcome-section" :style="{ background: `linear-gradient(135deg, ${currentThemeConfig.primaryColor}, #a777e3)` }">
      <div class="welcome-content">
        <h1 class="welcome-title">个人计划箱</h1>
        <p class="welcome-subtitle">高效管理 | 智能规划 | 数据分析</p>

        <!-- 主题切换 -->
        <div class="theme-switcher">
          <el-button
              v-for="theme in Object.keys(themes)"
              :key="theme"
              :type="currentTheme === theme ? 'primary' : 'default'"
              size="small"
              @click="currentTheme = theme"
          >
            {{ theme === 'light' ? '浅色' : theme === 'dark' ? '深色' : '蓝色' }}
          </el-button>
        </div>

        <div class="quick-stats">
          <div class="stat-card">
            <el-icon class="stat-icon"><Printer /></el-icon>
            <div class="stat-info">
              <h3>{{ plans.length }}</h3>
              <p>总计划数</p>
            </div>
          </div>
          <div class="stat-card">
            <el-icon class="stat-icon"><SetUp /></el-icon>
            <div class="stat-info">
              <h3>{{ completedPlans.length }}</h3>
              <p>已完成</p>
            </div>
          </div>
          <div class="stat-card">
            <el-icon class="stat-icon"><CirclePlus /></el-icon>
            <div class="stat-info">
              <h3>{{ pendingPlans.length }}</h3>
              <p>待完成</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 中间内容区域 -->
    <div class="content-section">
      <el-row :gutter="20">
        <!-- 左侧：计划表 -->
        <el-col :span="8">
          <div class="panel plan-list">
            <div class="panel-header">
              <h3><i class="el-icon-tickets"></i> 计划表</h3>
              <el-button type="text" icon="el-icon-plus">添加</el-button>
            </div>
            <div class="panel-body">
              <div class="plan-item"
                   v-for="plan in plans"
                   :key="plan.id"
                   :class="{ 'plan-completed': plan.completed }"
                   @click="togglePlanStatus(plan)">
                <div class="plan-status">
                  <el-checkbox :model-value="plan.completed"></el-checkbox>
                </div>
                <div class="plan-content">
                  <div class="plan-title" :class="{ 'title-completed': plan.completed }">
                    {{ plan.title }}
                  </div>
                  <div class="plan-meta">
                    <span class="plan-category">{{ plan.category }}</span>
                    <span class="plan-date">{{ plan.dueDate }}</span>
                  </div>
                </div>
                <div class="plan-priority" :class="getPriorityClass(plan.priority)">
                  {{ plan.priority === 'high' ? '高' : plan.priority === 'medium' ? '中' : '低' }}
                </div>
              </div>
            </div>
          </div>
        </el-col>

        <!-- 中间：已完成计划 -->
        <el-col :span="8">
          <div class="panel completed-plans">
            <div class="panel-header">
              <h3><i class="el-icon-check"></i> 已完成计划</h3>
              <span class="plan-count">{{ completedPlans.length }}</span>
            </div>
            <div class="panel-body">
              <div class="completion-chart">
                <div id="miniChart1" style="width: 100%; height: 200px;"></div>
              </div>
              <div class="completion-stats">
                <div class="stat-item">
                  <span class="stat-label">本周完成</span>
                  <span class="stat-value">12</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">完成率</span>
                  <span class="stat-value">{{ Math.round((completedPlans.length / plans.length) * 100) }}%</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>

        <!-- 右侧：待完成计划 -->
        <el-col :span="8">
          <div class="panel pending-plans">
            <div class="panel-header">
              <h3><i class="el-icon-time"></i> 待完成计划</h3>
              <span class="plan-count">{{ pendingPlans.length }}</span>
            </div>
            <div class="panel-body">
              <div class="pending-list">
                <div class="pending-item" v-for="plan in pendingPlans.slice(0, 4)" :key="plan.id">
                  <div class="pending-title">{{ plan.title }}</div>
                  <div class="pending-date">截止: {{ plan.dueDate }}</div>
                  <div class="pending-progress">
                    <el-progress
                        :percentage="plan.completed ? 100 : Math.floor(Math.random() * 60) + 20"
                        :color="plan.priority === 'high' ? '#F56C6C' : plan.priority === 'medium' ? '#E6A23C' : '#67C23A'">
                    </el-progress>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 底部图表区域 -->
    <div class="charts-section">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="chart-panel">
            <div class="chart-header">
              <h3>任务完成趋势</h3>
              <div class="chart-controls">
                <el-radio-group v-model="chart1Type" size="mini">
                  <el-radio-button label="line">线形</el-radio-button>
                  <el-radio-button label="bar">柱状</el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div id="main1" style="width: 100%; height: 300px;"></div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="chart-panel">
            <div class="chart-header">
              <h3>时间分配分析</h3>
            </div>
            <div id="main2" style="width: 100%; height: 300px;"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="less">
.home-container {
  padding: 20px;
  min-height: 100vh;
  transition: all 0.3s ease;
}

// 欢迎区域
.welcome-section {
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 20px;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;

  .welcome-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .welcome-title {
    font-size: 32px;
    margin-bottom: 10px;
    font-weight: 600;
  }

  .welcome-subtitle {
    font-size: 16px;
    margin-bottom: 30px;
    opacity: 0.9;
  }

  .theme-switcher {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 10px;
  }

  .quick-stats {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;

    .stat-card {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 15px;
      display: flex;
      align-items: center;
      flex: 1;
      min-width: 200px;
      backdrop-filter: blur(5px);

      .stat-icon {
        font-size: 24px;
        margin-right: 15px;
        background: rgba(255, 255, 255, 0.2);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .stat-info {
        h3 {
          font-size: 24px;
          margin: 0;
          font-weight: 600;
        }

        p {
          margin: 5px 0 0;
          opacity: 0.8;
          font-size: 14px;
        }
      }
    }
  }
}

// 内容区域
.content-section {
  margin-bottom: 20px;

  .panel {
    background: inherit;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    height: 100%;
    overflow: hidden;
    border: 1px solid v-bind('currentThemeConfig.borderColor');

    .panel-header {
      padding: 15px 20px;
      border-bottom: 1px solid v-bind('currentThemeConfig.borderColor');
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: v-bind('currentThemeConfig.textColor');

        i {
          margin-right: 8px;
          color: v-bind('currentThemeConfig.primaryColor');
        }
      }

      .plan-summary {
        font-size: 14px;
        color: #999;
        font-weight: normal;
        margin-left: 8px;
      }

      .plan-count {
        background: v-bind('currentThemeConfig.primaryColor');
        color: white;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 12px;
      }
    }

    .panel-body {
      padding: 20px;
    }
  }

  // 计划列表
  .plan-list {
    .plan-item {
      display: flex;
      align-items: center;
      padding: 15px;
      margin-bottom: 10px;
      border-radius: 8px;
      border: 1px solid v-bind('currentThemeConfig.borderColor');
      cursor: pointer;
      transition: all 0.3s;
      background: v-bind('currentThemeConfig.backgroundColor');

      &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
      }

      &.plan-completed {
        background: #f0f9ff;
        border-color: #67C23A;

        .plan-title {
          text-decoration: line-through;
          color: #999;
        }

        .plan-meta {
          opacity: 0.6;
        }
      }

      .plan-status {
        margin-right: 15px;
      }

      .plan-content {
        flex: 1;

        .plan-title {
          font-size: 15px;
          color: v-bind('currentThemeConfig.textColor');
          margin-bottom: 6px;
          font-weight: 500;
          transition: all 0.3s;

          &.title-completed {
            text-decoration: line-through;
            color: #999;
          }
        }

        .plan-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: #999;
          transition: all 0.3s;

          .plan-category {
            background: v-bind('currentThemeConfig.primaryColor');
            color: white;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 12px;
          }
        }
      }

      .plan-priority {
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: bold;
        color: white;

        &.priority-high {
          background: #F56C6C;
        }

        &.priority-medium {
          background: #E6A23C;
        }

        &.priority-low {
          background: #67C23A;
        }
      }
    }
  }

  // 已完成计划
  .completed-plans {
    .completion-stats {
      margin-top: 20px;
      display: flex;
      justify-content: space-around;

      .stat-item {
        text-align: center;

        .stat-label {
          display: block;
          font-size: 12px;
          color: #999;
          margin-bottom: 5px;
        }

        .stat-value {
          font-size: 24px;
          font-weight: bold;
          color: v-bind('currentThemeConfig.textColor');
        }
      }
    }
  }

  // 待完成计划
  .pending-plans {
    .pending-list {
      .pending-item {
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid v-bind('currentThemeConfig.borderColor');

        &:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        .pending-title {
          font-size: 14px;
          color: v-bind('currentThemeConfig.textColor');
          margin-bottom: 5px;
          display: block;
        }

        .pending-date {
          font-size: 12px;
          color: #999;
          margin-bottom: 10px;
          display: block;
        }
      }
    }
  }
}

// 图表区域
.charts-section {
  .chart-panel {
    background: inherit;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    padding: 20px;
    border: 1px solid v-bind('currentThemeConfig.borderColor');

    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;

      h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: v-bind('currentThemeConfig.textColor');
      }
    }
  }
}

// 响应式设计
@media (max-width: 1200px) {
  .welcome-section {
    .quick-stats {
      .stat-card {
        min-width: calc(50% - 10px);
      }
    }
  }
}

@media (max-width: 768px) {
  .home-container {
    padding: 10px;
  }

  .welcome-section {
    padding: 20px;

    .welcome-title {
      font-size: 24px;
    }

    .theme-switcher {
      position: static;
      margin-bottom: 20px;
    }

    .quick-stats {
      .stat-card {
        min-width: 100%;
      }
    }
  }

  .content-section {
    .el-col {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>