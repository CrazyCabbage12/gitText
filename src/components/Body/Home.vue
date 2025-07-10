<script setup>
import {onMounted, onUnmounted, ref, getCurrentInstance, nextTick} from "vue";
import * as echarts from 'echarts';
import axios from "axios";
import { watch } from 'vue';

const {proxy} = getCurrentInstance()

// 响应式数据
const chart1Type = ref('line')
const expensePeriod = ref('month')

// 图表实例
const echartInstance1 = ref(null);
const echartInstance2 = ref(null);
const miniChartInstance = ref(null);

// 初始化迷你图表
const initMiniChart = () => {
  const chartDom = document.getElementById('miniChart1');
  if (!chartDom) return;

  miniChartInstance.value = echarts.init(chartDom);
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
        fontSize: 12
      }
    },
    series: [
      {
        name: '数据分布',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
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
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '产品A' },
          { value: 735, name: '产品B' },
          { value: 580, name: '产品C' },
          { value: 484, name: '产品D' },
          { value: 300, name: '其他' }
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
    series: [
      {
        type: isLine ? 'line' : 'bar',
        smooth: isLine,
        data: [10, 11, 13, 11, 12, 12, 9]
      },
      {
        type: isLine ? 'line' : 'bar',
        smooth: isLine,
        data: [1, -2, 2, 5, 3, 2, 0]
      }
    ]
  };

  echartInstance1.value.setOption(option);
};

// 监听图表类型变化
watch(chart1Type, updateChart1);

// 在组件挂载时初始化
onMounted(() => {
  nextTick(() => {
    initChart1();
    initChart2();
    initMiniChart();
    getTableData();
    GetCountData();
  });
});

// 窗口大小变化时重新调整图表大小
window.addEventListener('resize', () => {
  echartInstance1.value?.resize();
  echartInstance2.value?.resize();
  miniChartInstance.value?.resize();
});

// 其余代码保持不变...
</script>

<template>
  <div class="home-container">
    <!-- 顶部欢迎区域 -->
    <div class="welcome-section">
      <div class="welcome-content">
        <h1 class="welcome-title">欢迎来到数据分析平台</h1>
        <p class="welcome-subtitle">实时监控 | 智能分析 | 数据可视化</p>
        <div class="quick-stats">
          <div class="stat-card">
            <div class="stat-icon"><i class="el-icon-user"></i></div>
            <div class="stat-info">
              <h3>1,245</h3>
              <p>活跃用户</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon"><i class="el-icon-data-analysis"></i></div>
            <div class="stat-info">
              <h3>86%</h3>
              <p>数据准确率</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon"><i class="el-icon-timer"></i></div>
            <div class="stat-info">
              <h3>2.5s</h3>
              <p>平均响应时间</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 中间内容区域 -->
    <div class="content-section">
      <el-row :gutter="20">
        <!-- 左侧：通知公告 -->
        <el-col :span="8">
          <div class="panel announcements">
            <div class="panel-header">
              <h3><i class="el-icon-bell"></i> 通知公告</h3>
              <el-button type="text">更多 <i class="el-icon-arrow-right"></i></el-button>
            </div>
            <div class="panel-body">
              <ul class="announcement-list">
                <li>
                  <span class="announcement-title">系统维护通知</span>
                  <span class="announcement-date">2023-07-15</span>
                </li>
                <li>
                  <span class="announcement-title">新增数据导出功能</span>
                  <span class="announcement-date">2023-07-10</span>
                </li>
                <li>
                  <span class="announcement-title">暑期优惠活动开始啦</span>
                  <span class="announcement-date">2023-07-05</span>
                </li>
              </ul>
            </div>
          </div>
        </el-col>

        <!-- 中间：数据概览 -->
        <el-col :span="8">
          <div class="panel data-overview">
            <div class="panel-header">
              <h3><i class="el-icon-pie-chart"></i> 数据概览</h3>
            </div>
            <div class="panel-body">
              <div class="mini-chart">
                <div id="miniChart1" style="width: 100%; height: 200px;"></div>
              </div>
            </div>
          </div>
        </el-col>

        <!-- 右侧：快捷操作 -->
        <el-col :span="8">
          <div class="panel quick-actions">
            <div class="panel-header">
              <h3><i class="el-icon-star-on"></i> 快捷操作</h3>
            </div>
            <div class="panel-body">
              <div class="action-grid">
                <div class="action-item">
                  <i class="el-icon-document"></i>
                  <span>数据报表</span>
                </div>
                <div class="action-item">
                  <i class="el-icon-setting"></i>
                  <span>系统设置</span>
                </div>
                <div class="action-item">
                  <i class="el-icon-upload"></i>
                  <span>数据导入</span>
                </div>
                <div class="action-item">
                  <i class="el-icon-download"></i>
                  <span>数据导出</span>
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
              <h3>本周天气变化趋势</h3>
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
              <h3>生活费用分析</h3>
              <el-select v-model="expensePeriod" size="mini" style="width: 100px;">
                <el-option label="本月" value="month"></el-option>
                <el-option label="本季" value="quarter"></el-option>
                <el-option label="本年" value="year"></el-option>
              </el-select>
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
  background-color: #f5f7fa;
  min-height: 100vh;
}

// 欢迎区域
.welcome-section {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 20px;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

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
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    height: 100%;
    overflow: hidden;

    .panel-header {
      padding: 15px 20px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: #333;

        i {
          margin-right: 8px;
          color: #6e8efb;
        }
      }
    }

    .panel-body {
      padding: 20px;
    }
  }

  // 通知公告
  .announcements {
    .announcement-list {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        display: flex;
        justify-content: space-between;
        padding: 12px 0;
        border-bottom: 1px solid #f0f0f0;

        &:last-child {
          border-bottom: none;
        }

        .announcement-title {
          color: #333;
          font-size: 14px;
        }

        .announcement-date {
          color: #999;
          font-size: 12px;
        }
      }
    }
  }

  // 快捷操作
  .quick-actions {
    .action-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;

      .action-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 10px;
        border-radius: 6px;
        background: #f9f9f9;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          background: #eef2fe;
          transform: translateY(-2px);
        }

        i {
          font-size: 24px;
          margin-bottom: 10px;
          color: #6e8efb;
        }

        span {
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
}

// 图表区域
.charts-section {
  .chart-panel {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    padding: 20px;

    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;

      h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: #333;
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
