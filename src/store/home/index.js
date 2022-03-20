import { reqCategoryList , reqBannerList } from '../../api/index'

const state = {
    categoryList: [],
    bannerList : ['1','2','3']
}
const actions = {
    // async与await知识点>>
    async categoryList(context) {
        // 调用函数，发送网路请求
        let result = await reqCategoryList()
        console.log('axios获取的数据：',result)

        if (result.code ===200)
            context.commit('CATEGORYLIST', result.data)
    },
    async getBannerList(context){
        let result = await reqBannerList()
        console.log('mockjs获得的数据：',result)

        if(result.code === 200)
            context.commit('GETBANNERLIST' , result.data)
    }
}
const mutations = {
    CATEGORYLIST(state, value) {
        state.categoryList = value
    },
    GETBANNERLIST(state,value){
        console.log('马上修改state')
        state.bannerList = value
    }
}
const getters = {

}

export default{
    state,
    actions,
    mutations,
    getters
}