<template>
  <van-swipe class="my-swipe"
             :autoplay="5000"
             indicator-color="white">
    <van-swipe-item v-for="item, index in object" :key="index">
        <img :src="item.pic" alt="">
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
    props: {
        object: Array
    }
}
</script>


<style lang="less" scoped>
.my-swipe {
    img {
        height: 100%;
        width: 100%;
    }
}
</style>
