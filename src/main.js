import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// 引入swiper的样式
import 'swiper/css/swiper.css'
// 启动mockserver
import './mock/mockserver'

// 注册全局组件
import TypeNav from './pages/Home/TypeNav'
import Pagination from './components/Pagination'
Vue.component('TypeNav',TypeNav)
Vue.component('Pagination',Pagination)
new Vue({
    render: h=>h(App),
    beforeCreate(){
        // 配置全局事件总线 
        Vue.prototype.$bus = this
    },
    router,
    store
}).$mount('#app')
