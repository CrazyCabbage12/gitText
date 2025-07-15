<template>
  <div class="chart-container">
    <!-- 第一行：三个仪表盘 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="chart-item">
          <h3>气温仪表盘</h3>
          <div class="chart-box" ref="gaugeChartRef1"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-item">
          <h3>等级仪表盘</h3>
          <div class="chart-box" ref="gaugeChartRef2"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-item">
          <h3>速度仪表盘</h3>
          <div class="chart-box" ref="gaugeChartRef3"></div>
        </div>
      </el-col>
    </el-row>

    <!-- 第二行：柱状图和折线图 -->
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="chart-item">
          <h3>柱状图</h3>
          <div class="chart-box" ref="barChartRef"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-item">
          <h3>折线图</h3>
          <div class="chart-box" ref="lineChartRef"></div>
        </div>
      </el-col>
    </el-row>

    <!-- 第三行：饼图和雷达图 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="chart-item">
          <h3>饼图</h3>
          <div class="chart-box" ref="pieChartRef"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-item">
          <h3>雷达图</h3>
          <div class="chart-box" ref="radarChartRef"></div>
        </div>
      </el-col>
    </el-row>

    <!-- 第四行：散点图和热力图 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="chart-item">
          <h3>散点图</h3>
          <div class="chart-box" ref="scatterChartRef"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';

// 气温仪表盘
const gaugeChartRef1 = ref(null);
const initGaugeChart1 = () => {
  const gaugeChart = echarts.init(gaugeChartRef1.value);
  gaugeChart.setOption({
    title: {
      text: '气温 (°C)',
    },
    tooltip: {
      formatter: '{a} <br/>{b} : {c}°C',
    },
    series: [
      {
        name: '气温',
        type: 'gauge',
        detail: { formatter: '{value}°C' },
        data: [
          { value: 25, name: '气温' },
        ],
        axisLine: {
          lineStyle: {
            color: [[0.2, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']],
          },
        },
      },
    ],
  });
};

// 等级仪表盘
const gaugeChartRef2 = ref(null);
const initGaugeChart2 = () => {
  const gaugeChart = echarts.init(gaugeChartRef2.value);
  gaugeChart.setOption({
    title: {
      text: '等级',
    },
    tooltip: {
      formatter: '{a} <br/>{b} : {c}',
    },
    series: [
      {
        name: '等级',
        type: 'gauge',
        detail: { formatter: '{value}' },
        data: [
          { value: 80, name: '等级' },
        ],
        axisLine: {
          lineStyle: {
            color: [[0.2, '#63869e'], [0.8, '#c23531'], [1, '#91c7ae']],
          },
        },
      },
    ],
  });
};

// 速度仪表盘
const gaugeChartRef3 = ref(null);
const initGaugeChart3 = () => {
  const gaugeChart = echarts.init(gaugeChartRef3.value);
  gaugeChart.setOption({
    title: {
      text: '速度 (km/h)',
    },
    tooltip: {
      formatter: '{a} <br/>{b} : {c} km/h',
    },
    series: [
      {
        name: '速度',
        type: 'gauge',
        detail: { formatter: '{value} km/h' },
        data: [
          { value: 60, name: '速度' },
        ],
        axisLine: {
          lineStyle: {
            color: [[0.2, '#c23531'], [0.8, '#91c7ae'], [1, '#63869e']],
          },
        },
      },
    ],
  });
};

// 柱状图配置
const barChartRef = ref(null);
const initBarChart = () => {
  const barChart = echarts.init(barChartRef.value);
  barChart.setOption({
    title: {
      text: '柱状图示例',
    },
    tooltip: {},
    xAxis: {
      data: ['A', 'B', 'C', 'D', 'E'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10],
      },
    ],
  });
};

// 折线图配置
const lineChartRef = ref(null);
const initLineChart = () => {
  const lineChart = echarts.init(lineChartRef.value);
  lineChart.setOption({
    title: {
      text: '折线图示例',
    },
    tooltip: {},
    xAxis: {
      data: ['A', 'B', 'C', 'D', 'E'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'line',
        data: [5, 20, 36, 10, 10],
      },
    ],
  });
};

// 饼图配置
const pieChartRef = ref(null);
const initPieChart = () => {
  const pieChart = echarts.init(pieChartRef.value);
  pieChart.setOption({
    title: {
      text: '饼图示例',
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        data: [
          { value: 1048, name: '搜索引擎' },
          { value: 735, name: '直接访问' },
          { value: 580, name: '邮件营销' },
          { value: 484, name: '联盟广告' },
          { value: 300, name: '视频广告' },
        ],
      },
    ],
  });
};

// 雷达图配置
const radarChartRef = ref(null);
const initRadarChart = () => {
  const radarChart = echarts.init(radarChartRef.value);
  radarChart.setOption({
    title: {
      text: '雷达图示例',
    },
    tooltip: {},
    legend: {
      data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）'],
    },
    radar: {
      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5],
        },
      },
      indicator: [
        { name: '销售（sales）', max: 6500 },
        { name: '管理（Administration）', max: 16000 },
        { name: '信息技术（Information Technology）', max: 30000 },
        { name: '客服（Customer Support）', max: 38000 },
        { name: '研发（Development）', max: 52000 },
        { name: '市场（Marketing）', max: 25000 },
      ],
    },
    series: [
      {
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        data: [
          {
            value: [4200, 20000, 20000, 35000, 50000, 18000],
            name: '预算分配（Allocated Budget）',
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: '实际开销（Actual Spending）',
          },
        ],
      },
    ],
  });
};

// 散点图配置
const scatterChartRef = ref(null);
const initScatterChart = () => {
  const scatterChart = echarts.init(scatterChartRef.value);
  scatterChart.setOption({
    title: {
      text: '散点图示例',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : ({c})',
    },
    xAxis: {
      scale: true,
    },
    yAxis: {
      scale: true,
    },
    series: [
      {
        name: '某数据',
        type: 'scatter',
        symbolSize: function (data) {
          return data[2] * 4;
        },
        data: [
          [10.0, 8.04, 0.9],
          [8.0, 6.95, 0.8],
          [13.0, 7.58, 0.7],
          [9.0, 8.81, 0.6],
          [11.0, 8.33, 0.5],
          [14.0, 9.96, 0.4],
          [6.0, 7.24, 0.3],
          [4.0, 4.26, 0.2],
          [12.0, 10.84, 0.1],
          [7.0, 4.82, 0.05],
          [5.0, 5.68, 0.01],
        ],
        markLine: {
          lineStyle: {
            type: 'dashed',
          },
          data: [
            { type: 'average', name: '平均值' },
          ],
        },
      },
    ],
  });
};

onMounted(() => {
  initGaugeChart1();
  initGaugeChart2();
  initGaugeChart3();
  initBarChart();
  initLineChart();
  initPieChart();
  initRadarChart();
  initScatterChart();
});
</script>

<style scoped lang="less">
.chart-container {
  padding: 20px;
}

.chart-item {
  border: 1px solid #ddd; /* 薄边框 */
  padding: 10px;
  border-radius: 8px;
  background-color: #fff; /* 白色背景 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  margin-bottom: 20px;
}

.chart-box {
  width: 100%;
  height: 300px; /* 固定高度 */
}

h3 {
  margin: 0 0 10px;
  text-align: center;
  font-size: 1.2rem;
  color: #333;
}
</style>