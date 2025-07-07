<template>
  <div id="map-container" style="width: 100%; height: 500px;"></div>
</template>

<script>
export default {
  name: "Map",
  mounted() {
    this.loadMapScript();
  },
  methods: {
    loadMapScript() {
      // 检查是否已经加载过高德地图脚本
      if (window.AMap) {
        this.initMap();
        return;
      }

      // 动态加载高德地图脚本
      const script = document.createElement("script");
      script.src =
          "//webapi.amap.com/maps?v=1.4.15&key=8fe4dee04d3c7d9dbe8d5870df82cbfc";
      script.onload = () => {
        // 确保 AMap 对象已经可用
        if (window.AMap) {
          setTimeout(() => {
            this.initMap();
          }, 100); // 添加一个短暂的延迟
        } else {
          console.error("高德地图脚本加载失败");
        }
      };
      document.head.appendChild(script);
    },
    initMap() {
      // 确保 AMap 对象已经可用
      if (!window.AMap) {
        console.error("高德地图对象未初始化");
        return;
      }

      // 初始化地图
      const map = new AMap.Map("map-container", {
        zoom: 10,
        center: [116.397428, 39.90923], // 北京市经纬度
      });

      // 添加标记
      const marker = new AMap.Marker({
        position: new AMap.LngLat(116.397428, 39.90923),
        title: "北京",
      });
      map.add(marker);
    },
  },
};
</script>

<style scoped>
#map-container {
  width: 100%;
  height: 500px;
}
</style>