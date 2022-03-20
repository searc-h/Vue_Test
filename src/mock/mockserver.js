// 引入Mockjs模块
import Mock from 'mockjs'
import banner from './banner.json'
// 注意这里的baner没有暴露，因为json格式文件默认暴露

// Mock.mock调用方法，第一个参数是请求地址，第二个参数是请求得到的数据
Mock.mock('/mock/bannerList',{code:200,data : banner})

console.log('is this file go throuh?')