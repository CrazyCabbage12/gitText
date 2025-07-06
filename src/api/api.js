import request from '@/api/request.js';

export default {
    GetTableData(){
        return request({
            url:'/getTableData',
            method:"get"
        })
    },
    GetCountData(){
        return request({
            url:'/GetCountData',
            method:"get"
        })
    },
    GetUserData(data){
        return request({
            url:'/GetUserData',
            method:"get",
            data,
        })
    },
}