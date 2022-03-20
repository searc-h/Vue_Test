// 这个模块负责API的统一管理
import requests from './request.js'
import reqmock from './reqmock.js'
// 注意这里使用的是分别暴露,因为这个模块会暴露很多函数


// 【1】.获取列表数据
export const reqCategoryList = ()=>{
    // axios请求返回promise对象，所以这个函数的返回值也是Promise对象
    return requests({
        // url:'/api/pro'
        url:"/product/getBaseCategoryList",
        method:'get'
    })
}
// 获取轮播图数据
export const reqBannerList = ()=>{
    return reqmock({
        url:'/bannerList',
        method:'get'
    })
}

// 获取Search列表,默认参数是空对象
export const reqSearchList = (params={})=>{
    console.log('params is ',params)
    return requests({
        url:"/list",
        method:'post',
        data:params
    })
}
