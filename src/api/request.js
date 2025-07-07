import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create();
const NETWORK_ERROR_MESSAGES = '网络连接错误';

// 请求拦截器
service.interceptors.request.use(function (config) {
    console.log("请求配置:", config);

    // 如果是 POST 请求且 data 是对象，确保它被序列化为 JSON 字符串
    if (config.method === 'post' && config.data && typeof config.data === 'object') {
        config.data = JSON.stringify(config.data);
        config.headers['Content-Type'] = 'application/json';
    }

    return config;
}, function (error) {
    console.error("请求错误:", error);
    ElMessage.error(NETWORK_ERROR_MESSAGES);
    return Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use(
    (res) => {
        console.log("响应内容:", res);

        // 检查响应数据是否存在且是对象类型
        if (!res.data || typeof res.data !== 'object') {
            console.warn("响应数据不符合预期，可能是后端返回了非JSON格式", res.data);
            ElMessage.error("后端返回的数据格式错误，请检查后端接口");
            return Promise.reject(new Error("后端返回的数据格式错误，请检查后端接口"));
        }

        // 直接返回响应数据
        return res.data;
    },
    (error) => {
        console.error("响应错误:", error);

        if (error.response) {
            // 服务器返回了错误状态码
            const status = error.response.status;
            if (status === 400) {
                ElMessage.error("请求参数错误");
            } else if (status === 500) {
                ElMessage.error("服务器内部错误");
            } else {
                ElMessage.error(NETWORK_ERROR_MESSAGES);
            }
        } else if (error.request) {
            // 请求已发出，但没有收到响应
            ElMessage.error("请求超时或网络连接错误");
        } else {
            // 在设置请求时触发了错误
            ElMessage.error("请求配置错误");
        }

        return Promise.reject(error);
    }
);

function request(options) {
    options.method = options.method || "get";
    return service(options);
}

export default request;