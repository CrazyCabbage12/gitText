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
    AddProductData(data){
        return request({
            url:'/AddProductData',
            method:"post",
            data,
        })
    },
    EditProductData(data) {
        return request({
            url: '/EditProductData',
            method: "post",
            data: data,
        });
    },
    DeleteProductData(data) {
        return request({
            url: '/DeleteProductData',
            method: "post",
            data: data,
        });
    },
    Login(data) {
        return request({
            url: '/Login',
            method: "post",
            data: data,
        });
    }
}