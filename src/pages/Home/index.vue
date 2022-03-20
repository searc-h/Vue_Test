<template>
    <div>
        <!-- TypeNav是全局注册的组件 -->
        <TypeNav/> 

        <ListContainer/>
        <Recommand/>
        <Rank/>
        <Like/>
        <Floor/>
        <Floor/>
        <Brand/>
    </div>
</template>

<script>
import ListContainer from './ListContainer/index.vue'
import Recommand from './Recommand/index.vue'
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Floor from './Floor/index.vue'
import Brand from './Brand/index.vue'
export default {
    name:'Home',
    components:{
        ListContainer,
        Recommand,
        Rank,
        Like,
        Floor,
        Brand
    },
}
</script>

<style>

</style>