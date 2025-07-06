<template>
<div>
  <div class="top-imgs">
    <el-carousel :interval="4000" type="card" height="350px">
      <el-carousel-item v-for="item in ImgsData" :key="item.img">
        <img :src="item.img" class="carousel-img" alt="轮播图" style="width: 100%;height: 100%;">/>
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="bottom-echart">
    <el-row :gutter="24">
      <el-col :span="12">
        <div id="main1" style="width: 100%;height: 350px"></div>
      </el-col>
      <el-col :span="12">
        <div id="main2" style="width: 100%;height: 350px"></div>
      </el-col>
    </el-row>
  </div>
</div>


</template>

<script setup>
import {onMounted, onUnmounted, ref,getCurrentInstance} from "vue";
import * as echarts from 'echarts';
import axios from "axios";
const ImgsData = ref([
  { img: new URL("@/assets/images/风景/img.png", import.meta.url).href },
  { img: new URL("@/assets/images/风景/img1.png", import.meta.url).href },
  { img: new URL("@/assets/images/风景/img2.png", import.meta.url).href },
  { img: new URL("@/assets/images/风景/img3.png", import.meta.url).href },
])

const echartInstance1 = ref(null);
const echartInstance2 = ref(null);

// 初始化 ECharts 图表
const initChart1 = () => {
  const chartDom = document.getElementById('main1');
  if (!chartDom) {
    console.error('ECharts 容器未找到');
    return;
  }

  echartInstance1.value = echarts.init(chartDom);
  const option = {
    title: {
      text: '本周天气变化预算'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} °C'
      }
    },
    series: [
      {
        name: 'Highest',
        type: 'line',
        data: [10, 11, 13, 11, 12, 12, 9],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        }
      },
      {
        name: 'Lowest',
        type: 'line',
        data: [1, -2, 2, 5, 3, 2, 0],
        markPoint: {
          data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
        },
        markLine: {
          data: [
            { type: 'average', name: 'Avg' },
            [
              {
                symbol: 'none',
                x: '90%',
                yAxis: 'max'
              },
              {
                symbol: 'circle',
                label: {
                  position: 'start',
                  formatter: 'Max'
                },
                type: 'max',
                name: '最高点'
              }
            ]
          ]
        }
      }
    ]
  };

  echartInstance1.value.setOption(option);
};
const initChart2 = () => {
  const chartDom = document.getElementById('main2');
  if (!chartDom) {
    console.error('ECharts 容器未找到');
    return;
  }

  echartInstance2.value = echarts.init(chartDom);
  const option = {
    title: {
      text: 'Waterfall Chart',
      subtext: 'Living Expenses in Shenzhen'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        var tar = params[1];
        return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      splitLine: { show: false },
      data: ['Total', 'Rent', 'Utilities', 'Transportation', 'Meals', 'Other']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Placeholder',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          borderColor: 'transparent',
          color: 'transparent'
        },
        emphasis: {
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent'
          }
        },
        data: [0, 1700, 1400, 1200, 300, 0]
      },
      {
        name: 'Life Cost',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'inside'
        },
        data: [2900, 1200, 300, 200, 900, 300]
      }
    ]
  };

  echartInstance2.value.setOption(option);
};

// 在组件挂载时初始化 ECharts
onMounted(() => {
  initChart1();
  initChart2();
  getTableData()
  GetCountData();
});

// 在组件卸载时销毁 ECharts 实例
onUnmounted(() => {
  if (echartInstance1.value) {
    echartInstance1.value.dispose();
  }
  if (echartInstance2.value) {
    echartInstance2.value.dispose();
  }
});

const {proxy} = getCurrentInstance()
const getTableData = async () => {
  const data = await proxy.$api.GetTableData();
  console.log(data.code);
}

const GetCountData = async () =>{
  const data = await proxy.$api.GetCountData();
  console.log(data);
}
</script>
<style scoped lang="less">
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.el-container{
  height: 100%;
  width: 100%;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.ImgText{
  text-align: center;
  font-size: 100px;
  color: chocolate;
  .a{
    font-family:"Font Awesome 6 Brands";
  }

}
</style>