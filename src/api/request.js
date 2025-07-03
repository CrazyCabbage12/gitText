// 添加请求拦截器
import axios from "axios";
import {ElMessage} from "element-plus";

const  service = axios.create()
const NETWORK_ERROR_MESSAGES = '网络连接错误'
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(
        (res)=>{
            const {code,data,msg} = res.data;
            if(code===200){
                return data;
            }else{
                ElMessage.error(msg || NETWORK_ERROR_MESSAGES);
                return Promise.reject(msg || NETWORK_ERROR_MESSAGES);
            }
        }
);
function request(options){
    options.method = options.method || "get";
    return service(options);
}
export default request;