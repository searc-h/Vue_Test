<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- 面包屑 -->
          <ul class="fl sui-tag">
            <!-- 如果有categoryName 有名字，那么就展示，没用就不展示 但是这里只能暂时一个 -->
            <li class="with-x" v-if="searchParams.categoryname">{{searchParams.categoryname}} <i @click="deleteItem">×</i> </li>
            <!-- 如果有keyword ，那么展示 -->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}} <i @click="deletekeyword">×</i> </li>
            <!-- 如果有trademark ,那么展示-->
            <!-- <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark}} <i @click="deletetrademark">×</i> </li> -->
            <!-- 如果有props，那么展示 -->
            <li class="with-x" v-for="(item,index) in searchParams.props" :key="index">{{item}}<i @click="deleteProps(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <!-- 给子组件传递 自定义事件 -->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrsInfo='attrsInfo'/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter" @click="changeTag">
              <ul class="sui-nav">
                <li :class="{'active': searchParams.order.split(':').indexOf('1') != -1}">
                  <a>综合
                    <span v-show="searchParams.order.split(':').indexOf('1') != -1 && searchParams.order.split(':')[1]=='up'">↑</span>
                    <span v-show="searchParams.order.split(':').indexOf('1') != -1 && searchParams.order.split(':')[1]=='des'">↓</span>
                  </a>
                </li>
                
                <li :class="{'active': searchParams.order.split(':').indexOf('2') != -1}">
                  <a>价格
                    <span v-show="searchParams.order.split(':').indexOf('2') != -1 && searchParams.order.split(':')[1]=='up'">↑</span>
                    <span v-show="searchParams.order.split(':').indexOf('2') != -1 && searchParams.order.split(':')[1]=='des'">↓</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="gooditem in goodsList" :key="gooditem.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"><img :src="gooditem.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{gooditem.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="gooditem.title">{{gooditem.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>1000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        <!--  分页器 -->
        <Pagination/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import {mapGetters, mapState} from 'vuex'
  export default {
    name: 'Search',
    data() {
      return {
        searchParams:{
          category1id:"",
          category2id:"",
          category3id:"",
          categoryname:"",
          keyword:"",
          order:"2:up",
          // 当前页数
          pageNo:1,
          pageSize:0,
          // 平台售卖属性操作带的参数
          props:[],
          // 品牌
          trademark:""
        },
      }
    },
    components: {
      SearchSelector
    },
    methods: {
      // 这个函数负责派发action,请求数据，所以会被频繁调用。因此不放在mounted(){}中
      getData(){
        this.$store.dispatch('getSearchList',this.searchParams)
      },
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

        this.$bus.$emit("clear") //通知Header组件修改输入框内容

        // 这里既然进行了路由的跳转，就不需要在这里发请求了，因为route已经改变。
        // this.getData()

        if(this.$route.query){
          this.$router.push({
            name:'search',
            query:this.$route.query
          })
        }
      },
      deleteProps(index){
        console.log(index)
        // 删除props中的元素
        this.searchParams.props.splice(index,1)
      },
      trademarkInfo(value){
        // 1.合并参数，
        // 2.发送网络请求
        console.log(value)
        // 3.增加面包屑操作
      },
      attrsInfo(value){
        if(this.searchParams.props.indexOf(value) == -1)
          this.searchParams.props.push(value)
        // 2.发送网络请求
        // console.log(value)
        // 3.增加面包屑操作
      },

      changeTag(event){
        let arr = {'综合':'1','价格':'2'}
        // 获得点击的是 1或者2
        let tagNum = arr[event.target.innerHTML.split(' ')[0]]

        // 保留第一个参数  要么是'1'，要么是'2'
        let firstConf = this.searchParams.order.split(':')[0]
        // 保留第二个参数  要么是'des',要么是'up'
        let secondConf = this.searchParams.order.split(':')[1]

        // 如果点击是自己，说明只需要改动第二个参数
        if(tagNum == firstConf){
          // if(secondConf == 'up'){
          //   this.searchParams.order = `${firstConf}:des`
          // }else this.searchParams.order = `${firstConf}:up`
          
          this.searchParams.order = `${firstConf}:${secondConf=='up'?'des':'up'}`
          
        }
        // 如果点击的不是自己，说明只需要改变第二个参数
        else{
          // if(event.target.innerHTML.split(' ')[0] == '综合'){
          //   this.searchParams.order = `1:${secondConf}`
          // }else{
          //   this.searchParams.order = `2:${secondConf}`
          // }
          this.searchParams.order = `${tagNum=='1'?'1':'2'}:${secondConf}`
        }
      }

    },
    beforeMount() {
      // Home组件跳转到Search组件过程：挂载之前，把传入的参数整理到searchParams
      // 对象的合并写法Object.assign
        console.log('beforeMount---')
        Object.assign(this.searchParams, this.$route.params,this.$route.query)
    },
    mounted() {
        console.log('mounted')
        this.getData()
    },
    computed:{
      ...mapGetters(['goodsList'])
    },
    // 数据监听
    watch:{
      // 监听的属性 ， 那么问题来了？
      // 已知$route算是一个对象，这里需要深度监听吗？？

      // 不需要！！ 深度监听是用来监听复杂数据结构的，数组里有数组，或者对象里有数组
      // 这里的$route对象里面只有  一个值
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
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

      }
    }
  }
</style>