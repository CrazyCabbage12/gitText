import Mock from 'mockjs';
//1，拦截路径2，方法类型get|post 3，假数据
import homeData from '@/api/MockData/homeData.js'
Mock.mock('/getTableData','get',homeData.GetTableData);
