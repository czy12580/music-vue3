<template>
  <div>
    <Header :title="title" :back="true"></Header>
    <div v-if="weatherInfo">
      {{ weatherInfo.province }} {{ weatherInfo.city }} {{ weatherInfo.weather }}
    </div>

    <div style="display: flex">
      <Number :number="number1"></Number>
      <Number :number="number2"></Number>
      <Number :number="number3"></Number>
    </div>

    <button @click="change()">改变</button>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Number from "@/components/Number.vue";
import axios from '@/utils/axios'
import { reactive, ref, onMounted, onUnmounted } from "vue";

components: {
  Header;
}
const title = ref("test");
const number1 = ref(0);
const number2 = ref(1);
const number3 = ref(2);
const weatherInfo = ref('');
onMounted( async () => {
  const url = 'https://restapi.amap.com/v3/weather/weatherInfo?key=fdd9edfa17e4a90fc6513be7f54d2d10&city=110101'
  await axios.get(url).then((res)=> {
    console.log(res);
    weatherInfo.value = res.lives[0]
  })
})

const change = () => {
  number1.value++;
  number2.value++;
  number3.value++;
};
</script>

<style lang="less" scoped></style>
