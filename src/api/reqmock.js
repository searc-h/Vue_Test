import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 利用axios对象的方法 create，去创建一个axios实例
const requests = axios.create({
    baseURL:'/mock', //基础路径，
    timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use((config)=>{
    // 里面有一个很重要的属性：Header
    // 进度条开始
    nprogress.start()
    return config
})

// 相应拦截器
requests.interceptors.response.use(
    
    (res)=>{
        // 进度条结束
        nprogress.done();
        return res.data
    },
    (err)=>{

        return Promise.reject(new Error('faile'))
    }
)
export default requests
