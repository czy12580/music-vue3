<template>
  <div>
    <Header :title="title"
            :back="true"></Header>
    <img :src="qrImg"
         alt="">
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import axios from '@/utils/axios'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Toast } from 'vant'
components: {
  Header
}
const title = ref('二维码登录')
const qrKey = ref('')
const qrImg = ref('')
const timer = ref(null)
const route = useRoute()
const router = useRouter()
const state = reactive({

})
onMounted(async () => {

  getCode()

  // 5秒检测一次二维码
  timer.value = setInterval(() => {
    checkCode()
  }, 5000)
})
// 离开页面销毁
onUnmounted(async () => {
  clearInterval(timer.value)
})


// 获取二维码
const getCode = async () => {
  await axios.get('/login/qr/key?timerstamp=' + Date.now()).then((res) => {
    qrKey.value = route.query.key = res.data.unikey
  })
  await axios.get('/login/qr/create?qrimg=true&key=' + qrKey.value + '&timerstamp=' + Date.now()).then((res) => {
    qrImg.value = res.data.qrimg
  })
}
// 检测二维码
const checkCode = async () => {
  await axios.get('/login/qr/check?key=' + route.query.key + '&timerstamp=' + Date.now()).then((res) => {
    console.log(res.code);
    if (res.code === 803) {
      clearInterval(timer.value)
      axios.post('/login/status?=timestamp=' + Date.now(), {cookie: res.cookie}).then(res => {
        localStorage.setItem('token', JSON.stringify(res));
      })
      Toast.success('扫码登录成功')
      router.push('/')
    }
  })
}

</script>

<style lang="less" scoped>
</style>