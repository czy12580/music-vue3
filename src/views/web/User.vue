<template>
  <div>
    <Header :title="title"
            :back="true"></Header>
    <div class="main">
      <div class="user-box">
        <img :src="userInfo.avatarUrl"
             alt="">
        <div class="text">
          <span>用户名： {{ userInfo.nickname }}</span>
        </div>
      </div>
      <van-button round
                  block
                  type="warning"
                  @click="userLogout">
        退出登录
      </van-button>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import { onMounted, reactive, ref, toRefs} from 'vue'
import { useRouter } from 'vue-router'
import { logout, getUserInfo } from '../../service/index'

export default {
  components: {
    Header
  },
  setup() {
    const router = useRouter()
    const data = reactive({
      title: '个人中心',
      userInfo: {},
      x: ''
    })


    onMounted(async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      data.userInfo = token.data.profile
    })

    const userLogout = async () => {
      await logout()
      localStorage.removeItem('token')
      router.push('/')
    }



    return {
      ...toRefs(data),
      userLogout
    }
  },
}
</script>
<style lang="less" scoped>
.container {
  width: 100%;
}
.main {
  max-width: 414px;
  padding: 30px 20px;
  margin: 0 auto;
  .user-box {
    height: 120px;
    margin: 10px 10px 50px 10px;
    padding: 0 20px;
    background: linear-gradient(90deg, #1baeae, #51c7c7);
    box-shadow: 0 2px 3px #269090;
    border-radius: 10px;
    display: flex;
    align-items: center;
    color: #fff;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .text {
      padding: 0 10px;
      font-size: 18px;
    }
  }
  .movearea {
    transition: 0.3s background-color ease;
    height: 120px;
    border-radius: 10px;
    margin: 10px 10px 50px 10px;
    padding: 0 20px;
    color: #fff;
  }
}
</style>