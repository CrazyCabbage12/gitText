import Mock from 'mockjs';
//1，拦截路径2，方法类型get|post 3，假数据
import homeData from '@/api/MockData/homeData.js'
Mock.mock('/getTableData','get',homeData.GetTableData);
Mock.mock('/GetCountData','get',homeData.GetCountData);
Mock.mock('/GetUserData','get',homeData.GetUserData);
Mock.mock('/AddProductData', 'post', homeData.AddProductData);
Mock.mock('/EditProductData', 'post', homeData.EditProductData);
Mock.mock('/DeleteProductData', 'post', homeData.DeleteProductData);