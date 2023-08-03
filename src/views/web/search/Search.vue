<template>
  <div>
    <Header :title="title" :back="true"></Header>
    <van-search
      v-model="keywords"
      shape="round"
      background="#000"
      @search="onSearch"
      placeholder="请输入歌名、歌手、专辑..."
    >
    </van-search>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import axios from '@/utils/axios'
import { reactive, ref, onMounted } from "vue";
import { search } from "@/service/data.js"
components: {
  Header;
}
const title = ref("搜索");
const keywords = ref(null);
const params = ref({});

const onSearch = async () => {
  const res = await search({keywords: keywords.value, type: 1})
  console.log(res);
};

onMounted(async () => {});
</script>

<style lang="less" scoped></style>
