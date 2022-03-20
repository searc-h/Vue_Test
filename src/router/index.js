import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Home from '../pages/Home'
import Search from '../pages/Search'
import Login from '../pages/Login'
import Register from '../pages/Register'


let originPush = VueRouter.prototype.push; // 备份原型上的push方法,但是他丢失了上下文
let originReplace = VueRouter.prototype.replace;
// 重写push,replace方法
VueRouter.prototype.push = function(location , resolve , reject){
    if(resolve && reject){
        // call与apply都可以修改函数的上下文一次 ，注意区别
        // 这里的this是原型上的this ，我们需要把这个this传给originPush
        originPush.call(this,location) // 让这个oringinPush 的 上下文是 原型上的 上下文
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function(location , resolve , reject){
    if(resolve && reject){
        // call与apply都可以修改函数的上下文一次 ，注意区别
        // 这里的this是原型上的this ，我们需要把这个this传给originPush
        originReplace.call(this,location) // 让这个oringinPush 的 上下文是 原型上的 上下文
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}
export default new VueRouter({
    routes:[
        {
            path:'/home',
            component:Home,
            meta:{showFooter:true}
        },
        {
            // 在占位符位置后面加 ? 问号，可以解决没有传params 时，导致的路径不完整的问题
            path:'/search/:keyword?',
            name:'search',
            component:Search,
            meta:{showFooter:true}
        },
        {
            path:'/login',
            component:Login,
            meta:{showFooter:false}
        },
        {
            path:'/register',
            component:Register,
            meta:{showFooter:false}
        },
        {
            path:'*',
            redirect:'/home'
        }
    ]
})