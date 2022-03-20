<template>
  <!-- 商品分类导航 -->
  <div class="type-nav" >
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" @click="clickToSearch" v-show="showIf">
            <div class="all-sort-list2">
              <!-- 一级菜单 -->
              <div
                class="item"
                v-for="(cd1, index) in categoryList"
                :key="cd1.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <!-- 一级菜单名 -->
                  <a
                    :data-categoryName="cd1.categoryName"
                    :data-category1Id="cd1.categoryId"
                    >{{ cd1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :class="{ blockOne: currentIndex === index }"
                >
                  <div class="subitem">
                    <!-- 二级菜单 -->
                    <dl
                      class="fore"
                      v-for="cd2 in cd1.categoryChild"
                      :key="cd2.categoryId"
                    >
                      <dt>
                        <!-- 二级菜单名 -->
                        <a
                          :data-categoryName="cd2.categoryName"
                          :data-category2Id="cd2.categoryId"
                          >{{ cd2.categoryName }}</a
                        >
                      </dt>
                      <!-- 三级菜单 -->
                      <dd>
                        <em
                          v-for="cd3 in cd2.categoryChild"
                          :key="cd3.categoryId"
                        >
                          <!-- 三级菜单名 -->
                          <a
                            :data-categoryName="cd3.categoryName"
                            :data-category3Id="cd3.categoryId"
                            >{{ cd3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
        
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 按需加载,默认暴露 
import thorttle from "lodash/throttle";
import { mapActions, mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      // 用户鼠标移动上的index值
      currentIndex: -1,
      showIf:true
    }
  },
  methods: {
    // 节流处理，用key：value的形式
    changeIndex: thorttle(function (index) {
      if(index === -1 && this.$route === '/search')
          this.showIf = false
      this.currentIndex = index;
      
    }, 50),

    enterShow(){
        this.showIf = true;
    },
    leaveShow(){
      // 离开菜单区，首先让index改变为-1 ，再根据是否处于home路由，改变showIf的值
      this.currentIndex = -1
      if(this.$route.path != '/home')
        this.showIf = false
    },

    clickToSearch(event) {
      let { categoryname, category1id, category2id, category3id } = event.target.dataset;
      let locaiton = {name:'search'}
      let query = { categoryname: categoryname };
      if (categoryname) {
        // 点击的是a标签
        if (category1id) {
          // 是一级菜单
          query.category1id = category1id;
        } else if (category2id) {
          // 是一级菜单
          query.category2id = category2id;
        } else {
          // 是一级菜单
          query.category3id = category3id;
        }
        locaiton.query = query
        // 以上就完成了 location的配置

        // 如果原先由pramas参数，也要一起带过去
        if(this.$route.params){
          locaiton.params = this.$route.params
        }
        console.log(locaiton)
        this.$router.push(
          locaiton
        );
      }
    },
  },
  mounted() {
    // 如果当前是出于search路由下，就不显示三级菜单（默认是显示）
    if(this.$route.path === '/search')
      this.showIf = false
  },
  computed: {
    ...mapState({
      // 对象写法，右侧需要一个函数，当时使用这个属性时，这个函数就会执行一次
      // 参数为state，函数返回值作为该属性的值
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
};
</script>

<style lang='less' scoped>
.cur {
  background-color: #ccc;
}

.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          // hover修改display
          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
          // js实现hover
          .blockOne {
            display: block;
          }
        }
      }
    }
    .sort-enter{
      transform: rotateX(50deg);
    }
    .sort-enter-to{
      transform: rotateX(0deg);
    }
    .sort-enter-active{
      transform-origin: top;
      transition: all 0.5s;
    }
  }
}
</style>