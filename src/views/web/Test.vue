<template>
  <div>
    <Header :title="title" :back="true"></Header>
    <div class="box">test</div>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import { reactive, ref, onMounted } from "vue";
components: {
  Header;
}
const title = ref("test");

onMounted(async () => {});

// const setFontSize = () => {
//     const width = document.documentElement.clientWidth
//     document.getElementsByTagName('html')[0].style.fontSize = (width / 450) * 100 + 'px'
// }

// document.addEventListener('DOMContentLoaded', setFontSize())
// window.onresize = setFontSize()
</script>

<style lang="less" scoped>
@media all and (max-width: 900px) {
  .box {
    font-size: 37.5px;
    background: skyblue;
    width: 200px;
    height: 200px;
  }
}
</style>
