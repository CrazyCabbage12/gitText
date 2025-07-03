import request from '@/api/request.js';

export default {
    GetTableData(){
        return request({
            url:'/getTableData',
            method:"get"
        })
    }
}