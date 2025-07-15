<template>
  <div class="wrapper">
    <!-- 地图容器 -->
    <div id="container" ref="containerRef" class="map"></div>

    <!-- 信息面板 -->
    <div class="info">
      <h4>{{ statusText }}</h4>
      <hr />
      <p v-html="resultHtml"></p>
      <hr />
      <p>
        由于众多浏览器已不再支持非安全域的定位请求，为保证成功率和精度，请升级您的站点到 HTTPS。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

/* ---------------- 响应式数据 ---------------- */
const containerRef = ref(null)
const statusText = ref('正在定位...')
const resultHtml = ref('')

/* ---------------- 高德 key & 安全密钥 ---------------- */
const AMAP_KEY = '4fd12fbb1cf4bef443da632e4cb691dc'                // ← 换成自己的 key
const SECURITY_JS_CODE = '7d2c3efd41e217caef0d242d38869f18'   // ← 换成自己的安全密钥

/* ---------------- 工具：动态加载脚本 ---------------- */
const loadScript = (src) =>
    new Promise((resolve, reject) => {
      if (window.AMap) return resolve(window.AMap)
      const script = document.createElement('script')
      script.src = src
      script.onload = () => resolve(window.AMap)
      script.onerror = reject
      document.head.appendChild(script)
    })
import axios from 'axios'

async function reverseGeocode(lng, lat) {
  const url =
      `https://restapi.amap.com/v3/geocode/regeo?key=${AMAP_KEY}&location=${lng},${lat}&extensions=all`
  const { data } = await axios.get(url)
  return data.regeocode?.formatted_address || '暂无详细地址'
}
/* ---------------- 生命周期 ---------------- */
onMounted(async () => {
  try {
    /* 1. 设置安全密钥 */
    // window._AMapSecurityConfig = { securityJsCode: SECURITY_JS_CODE }

    /* 2. 加载高德 API */
    const AMap = await loadScript(
        `https://webapi.amap.com/maps?v=2.0&key=${AMAP_KEY}`
    )

    /* 3. 初始化地图 */
    const map = new AMap.Map(containerRef.value, {
      resizeEnable: true,
      zoom: 12
    })

    /* 4. 定位插件 */
    AMap.plugin('AMap.Geolocation', () => {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 10000,
        buttonPosition: 'RB',
        buttonOffset: new AMap.Pixel(10, 20),
        zoomToAccuracy: true,
        needAddress: true
      })

      map.addControl(geolocation)

      geolocation.getCurrentPosition((status, result) => {
        if (status === 'complete') {
          onComplete(result)
        } else {
          onError(result)
        }
      })
    })
  } catch (e) {
    statusText.value = '加载失败'
    resultHtml.value = e.message || '高德地图脚本加载失败'
  }
})

/* ---------------- 定位回调 ---------------- */
function onComplete(data) {
  statusText.value = '定位成功'
  const str = [
    `定位结果：${data.position}`,
    `定位类别：${data.location_type}`,
    `位置：${data.formattedAddress}`,
    `详细信息：${data.message}`,
    data.accuracy ? `精度：${data.accuracy} 米` : '',
    `是否经过偏移：${data.isConverted ? '是' : '否'}`
  ].filter(Boolean)
  resultHtml.value = str.join('<br>')
}

function onError(data) {
  statusText.value = '定位失败'
  resultHtml.value = `失败原因排查信息：${data.message}`
}
</script>

<style scoped>
.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.map {
  flex: 1;
}
.info {
  padding: 12px;
  font-size: 14px;
  line-height: 1.6;
  background: #fff;
  border-top: 1px solid #e0e0e0;
}
</style>