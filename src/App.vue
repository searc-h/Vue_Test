<template>
    <div>
        <Header></Header>
        <router-view></router-view>
        <Footer  v-show="$route.meta.showFooter"></Footer>
    </div>
    
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
    name:"App",
    components:{
        Header,
        Footer
    },
    mounted() {
        // App组件挂载就发送请求，而不是在TypeNav中发请求的原因：App只挂在一次
        this.$store.dispatch('categoryList')
    },
}
</script>

<style>

</style>