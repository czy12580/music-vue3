<template>
  <header>
    <van-icon v-if="props.back" name="arrow-left" size="30" @click="goBack()" />
    <van-icon v-else name="ellipsis" size="30" @click="show = true" />
    <h3 class="title">{{ props.title }}</h3>
    <div class="user">
      <van-button round type="success" color="linear-gradient(to right, #ff6034, #ee0a24)" to="login"
        v-if="!isLogin">登录</van-button>
      <div v-else>
        <span @click="goUser()">{{ userInfo.nickname }}</span>
      </div>

    </div>

    <van-popup :show="show" position="left" closeable @click-close-icon="close()"
      :style="{ width: '50%', height: '100%' }">
      <div class="side-bar">
        <van-button color="#000" to="/playlist/detail">歌单</van-button>
        <van-button color="#000" to="/singer/category">歌手</van-button>
        <van-button color="#000" to="">MV</van-button>
        <van-button color="#000" to="/search">搜索</van-button>
      </div>
    </van-popup>
  </header>
</template>
<script setup>
import { onMounted, defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();
const props = defineProps(['title', 'back'])

const isLogin = ref(false)
const show = ref(false)
const uesrInfo = ref({})

onMounted(async () => {
  const token = JSON.parse(localStorage.getItem('token'));
  if (token) {
    isLogin.value = true;
    userInfo.value = token.data.profile;
  }
})

const goBack = () => {
  router.go(-1);
}

const goUser = () => {
  router.push('/user')
}

const close = () => show.value = false;

</script>
<style lang="less" scoped>
header {
  height: 60px;
  background-color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 0 10px;
  position: sticky;
  top: 0;
  z-index: 99999;
  font-size: 18px;

  .title {
    font-size: 20px;
  }

  .van-button {
    padding: 0 15px;
  }

  .side-bar {
    padding: 37px 20px;
    display: flex;
    flex-direction: column;

    .van-button {
      margin-bottom: 10px;
    }
  }
}
</style>