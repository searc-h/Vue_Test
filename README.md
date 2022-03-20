## 1.如何指定params参数可穿可不传？
```
routes:[
  {
    name:'search',
    path:'/search/:keyword?'
    在占位符号后面加一个问好
  }
]
```

## 2.params参数可以传递可以不传递，但是如果传递是空串，如何解决？
```
let location = {name:'search',params:{ keyword:this.inputvalue || undefined},query:{...}}
this.$route.push(location)

```

## 3.编程式导航多次点击出现的错误解决？
>#### -通过给push方法传递成功的回调与失败的回调，可以解决，但是这样治标不治本

>#### ----重写push与raplace方法，router文件夹下的index.js下重写

## 4.跨域问题
>###  1.什么是跨域？
>>#### 协议，域名，端口号不同的请求，称为跨域
>>#### 客户端与服务器存在跨域问题，服务器与服务器之间不存在跨域问题


## 5.进度条的使用 nprogress的引入以及aioxs的二次封装
```
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'


import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 利用axios对象的方法 create，去创建一个axios实例
const requests = axios.create({
    baseURL:'/api', //基础路径，
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
        // 进度条开始
        nprogress.done();
        return res.data
    },
    ()=>{
        return Promise.reject(new Error('faile'))
    }
)
export default requests
```


## 6.Vuex建议用模块式开发
```
import home from './home'
import search from './search'
export default new Vuex.Store({
    // 实现Vuex仓库模块开发存储数据
    modules:{
        home,
        search
    }
})

这里的$store分为home和search两个部分，
home里面有state,acitons,mutations,getters
search里面也有自己的...
且这里面没有开启命名空间
但是需要注意的是：actions,mutations里面的方法不能重名，否则在调用时都会被调用

```

## 7.在写三级联动组件时，需要对返回的数据分析，最重要的是对原html静态代码进行分类，找对1，2，3级菜单

## 8.如何用js实现hover效果
```
:class="{cur:currentIndex===index}"
让鼠标移上的元素有类名cur，通过style标记.cur修改样式
```


##  9.防抖与节流  引入lodash
>##  1.防抖：
>>### -----连续多次触发某事件，当最后一次触发该事件后的规定时间内，执行该事件的回调，一次（最终触发一次）
```
input.ouinput = _.debounce(function(){
    console.log('发出ajax请求')
},1000)
<!-- 该例子中，连续输入，在最后输入完毕后的1000ms内无输入，则执行回调 -->
```
>##  2.节流：
>>### -----连续多次触发某事件，在某个时间间隔后，触发该事件的回调，可以多次(把频繁触发变成少量出发)
```
btn.onclick = _.throttle(function(){
    value++
},20)
<!-- 该例子中，连续点击，在20ms间隔触发一次，执行回调 -->
```


## 10.编程式导航+事件委派+自定义属性 实现三级菜单的路由跳转与传递参数
```
clickToSearch(event) {
    通过dataset来获取元素的自定义属性，不过需要注意的有两点：
    自定义属性需要data-categoryName来定义（需要加上data-）
    获取自定义属性 值categoryname （小写，且没有data-）
      let { categoryname, category1id, category2id, category3id } = event.target.dataset;
      let location = { categoryname: categoryname };
      console.log(location)
      if (categoryname) {
        // 点击的是a标签
        if (category1id) {
          // 是一级菜单
          location.category1id = category1id;
        } else if (category2id) {
          // 是一级菜单
          location.category2id = category2id;
        } else {
          // 是一级菜单
          location.category3id = category3id;
        }
        // 以上就完成了 location的配置

        this.$router.push({
          path: "/search",
          query: location,
        });
      }
    },
```

## 11. 每当路由改变，原本的路由对应的所有组件销毁，新的路由下对应的所有组件加载
## 这就会发现：如果把向服务器获取三级菜单的请求，放在TypeNav身上，就会出现/home路由跳转到/search组件，或者/search组件跳转到/home组件，都会发送请求，这样是多余的操作，我们只需要向服务器获一次就行了，所以我们应该考虑把发送请求的这个行为，放在哪个组件身上合适
```
  this.$store.dispatch("categoryList");
```


## 12.合并参数的解决
```
  //原先有params，合并到其中
        locaiton.query = query
        // 以上就完成了 location的配置

        // 如果原先由pramas参数，也要一起带过去
        if(this.$route.params){
          locaiton.params = this.$route.params
        }
        this.$router.push(
          locaiton
        );
  //原先有query，合并到其中
        let data = {name:'search',params:{ keyword:this.inputvalue || undefined}}
        // 如果有query参数，应该一起带过去
        if(this.$route.query){
          data.query = this.$route.query
        }
        this.$router.push(data)
```

##  13.开发Home首页当中的ListContainer组件与Floor组件时，我们用到Mockjs来模拟请求数据，这里鉴于资料不全的原因，只写了ListContainer组件的

>###   1.在项目中src文件夹中创建mock文件夹
>###   2.准备JSON数据(mock文件夹中创建相应的JSON文件)   记得格式化，不留空格，不然不行
>###   3.把mock数据需要的图片放置到publick文件夹中【public文件夹在打包时，会原封不动放进dist打包文件】
>###   4.创建mockServe.js通过mockjs插件实现模拟数据
>###   5.mockServe.js文件在入口文件中引入（至少需要执行一次）

##   14.swiper使用：
>###   1.引入包 css, js
>### 2.页面中必须由相应的结构
>### 3.初始化swiper实例，注意结构中是否有异步获取的数据
>### 4.如果有异步获取的数据，那么就要采用下面的方法解决

##  15.ListContainer组件中的轮播图v-for='(item) in bannerList'，其中 bannerList如果是发送请求获得的数据，那么就会出现异步导致的问题，无法初始化swiper实例。解决方法：

>###  1.一般解决方法，将初始化swiper实例步骤放进updated
>### 2.最好解决方法：watch+nextTick
>>#### 问题：只用watch时，当数据更新，是先重新渲染页面，还是先执行watch函数？
>>>####    如果是先渲染页面，再执行watch，那么当watch执行时，页面渲染完毕。那么初始化成功
>>>####    如果是先执行watch，再渲染页面，那么当watch执行时，页面还没有渲染，肯定会失败
>>####    但是我们不清楚到底先渲染页面，还是先执行watch，所以，我们应该利用nextTick，让页面渲染完毕之后，执行watch内容
```
computed: {
    // 计算属性可以直接在模板中使用，不需要再在data中定义
    ...mapState({
      bannerList: (state) => {
        console.log('得到bannerList')
        return state.home.bannerList;
      },
    }),
  },
  mounted() {
    console.log('派发dispatch')
    this.$store.dispatch('getBannerList')
  },
  watch:{
    bannerList:{
      handler(newValue,oldValue){
        // nextTick在循环更新页面之后，或者在数据修改之后，执行（下一次DOM更新之后再执行）
        this.$nextTick(()=>{
          var mySwiper = new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项
            
            // 如果需要分页器
            pagination: {
            el: '.swiper-pagination',
            clickable:true
            },
            
            navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            },
          })
        })
      }
    }
  }
```

## 16.如何解决Search模块很多地方都可以触发dispatch，所以给元素增加编程式导航+事件委派是不行的。
>###    ！！监听$route 的变化，如果有变化就说明需要派发dispatch,重新请求数据。
```
// 数据监听
    watch:{
      // 监听的属性 ， 那么问题来了？
      // 已知$route算是一个对象，这里需要深度监听吗？？

      // 不需要！！ 深度监听是用来监听复杂数据结构的，数组里有数组，或者对象里有数组
      // 这里的$route对象里面只有  一个值
      $route(newValue , oldValue){
        this.getData()
      }
    }
```

## 17.面包屑的相关操作
>###  1.$router的修改：解决参数合并问题
```
      $route(newValue , oldValue){
          // 发请求前，就把params参数中的可能被修改的值变为为空
          this.searchParams.category1id = undefined
          this.searchParams.category2id = undefined
          this.searchParams.category3id = undefined
          this.searchParams.categoryname = undefined
          // keyword 与 categoryName 每次都会改变，不需要置空
          console.log('请求之前修改为undefine的searchParams',this.searchParams)
          // 需要注意这里有bug，可能是由于Object.assign 引起的
       
          // 请求数据之前整理参数，改变keyword 与 categoryName
          Object.assign(this.searchParams, this.$route.params,this.$route.query)
          console.log('整理参数之后的searchParams',this.searchParams)
          this.getData()
      }
```

>### 2.delete部分：解决路径没改变的问题
```
      deleteItem(){
        this.searchParams.categoryname = undefined
        this.searchParams.category1id = undefined
        this.searchParams.category2id = undefined
        this.searchParams.category3id = undefined
        // 必须修改$route里面的数据，因为进入getData是会整理$route 里面的数据的，只修改searchParams是没用的

        // 这里既然进行了路由的跳转，就不需要在这里发请求了，因为route已经改变。
        // this.getData()

        if(this.$route.params){
          this.$router.push({
            name:'search',
            params:this.$route.params
          })
        }
      },
      deletekeyword(){
        this.searchParams.keyword = undefined
        // 必须修改$route里面的数据，因为进入getData是会整理$route 里面的数据的，只修改searchParams是没用的
        
        // 这里既然进行了路由的跳转，就不需要在这里发请求了，因为route已经改变。
        // this.getData()

        if(this.$route.query){
          this.$router.push({
            name:'search',
            query:this.$route.query
          })
        }
      }
```
>###  3.全局事件总线：解决search组件中的keyword面包屑被删掉后，输入框的改变
```
Search组件：
this.$bus.$emit("clear") //通知Header组件修改输入框内容

Header组件：
// 全局事件总线，挂载clear事件到Vue.prototype 上
  mounted() {
    this.$bus.$on('clear',()=>{
      this.inputvalue = ''
    })
  },
```

>###  4.自定义事件：解决SearchSelectoer组件需要发送求情问题

>## 17.如何解决综合排序，价格排序 的切换问题
```
      changeTag(event){
        let arr = {'1':'综合','2':'价格'}
        // 保留第一个参数  要么是'1'，要么是'2'
        let firstConf = this.searchParams.order.split(':')[0]
        // 保留第二个参数  要么是'des',要么是'up'
        let secondConf = this.searchParams.order.split(':')[1]

        // 如果点击是自己，说明只需要改动第二个参数
        if(event.target.innerHTML.split(' ')[0] == arr[firstConf]){
          if(secondConf == 'up'){
            this.searchParams.order = `${firstConf}:des`
          }else this.searchParams.order = `${firstConf}:up`
        }
        // 如果点击的不是自己，说明只需要改变第二个参数
        else{
          if(event.target.innerHTML.split(' ')[0] == '综合'){
            this.searchParams.order = `1:${secondConf}`
          }else{
            this.searchParams.order = `2:${secondConf}`
          }
        }
      }
  ！！优化之后的代码
      changeTag(event){
        let arr = {'综合':'1','价格':'2'}
        // 获得点击的是 1或者2
        let tagNum = arr[event.target.innerHTML.split(' ')[0]]

        let firstConf = this.searchParams.order.split(':')[0]
        let secondConf = this.searchParams.order.split(':')[1]

        // 如果点击是自己，说明只需要改动第二个参数
        if(tagNum == firstConf){
          this.searchParams.order = `${firstConf}:${secondConf=='up'?'des':'up'}`
        }
        // 如果点击的不是自己，说明只需要改变第二个参数
        else{
          this.searchParams.order = `${tagNum=='1'?'1':'2'}:${secondConf}`
        }
      }
```

># （重点一）18.分页器逻辑
>##  分页器功能：避免一次性请求大量数据，减少一次性加载数据。

