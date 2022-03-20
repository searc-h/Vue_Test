import {reqSearchList} from '../../api/index'
const state ={
    searchList:{}
}
const actions={
    async getSearchList(context,params={}){
        let result = await reqSearchList(params)
        context.commit('GETSEARCHLIST',result.data)
    }
}
const mutations={
    GETSEARCHLIST(state,value){
        state.searchList = value || {}
    }
}
// 此时的getters 的作用就发挥起来了：让state里 的数据结构更简单
// 并且注意，state仓库分模块，但是getter不用分模块
const getters={
    // 这里的state参数是  当前仓库中的state，而不是大仓库的
    attrsList(state){
        return state.searchList.attrsList || []  // 在最开始到时候，searchList很有可能是空
    },
    goodsList(){
        return state.searchList.goodsList || [] // 在最开始到时候，searchList很有可能是空
    },
    trademarkList(){
        return state.searchList.trademarkList || [] // 在最开始到时候，searchList很有可能是空
    }


}
export default {
    state,
    actions,
    mutations,
    getters
}