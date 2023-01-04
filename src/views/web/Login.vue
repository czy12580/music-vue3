<template>
  <div class="bg">
    <!-- <Header :title="type == 'login'? '登录': '注册'"
            :back="true"></Header> -->
    <div class="main">
      <div class="logo">
        <img src="../../../public/vite.svg"
             alt="">
      </div>

      <div class="login-box"
           v-if="type == 'login'"
           ref="loginForm">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field v-model="loginData.phone"
                       name="phone"
                       label="手机号"
                       placeholder="手机号"
                       :rules="[{ required: true, message: '请输入手机号' }]" />
            <van-field v-model="loginData.password"
                       type="password"
                       name="password"
                       label="密码"
                       placeholder="密码"
                       :rules="[{ required: true, message: '请输入密码' }]" />
          </van-cell-group>
          <div style="margin: 16px;">
            <van-button round
                        block
                        type="primary"
                        native-type="submit">
              登录
            </van-button>
          </div>
          <div style="margin: 16px;">
            <van-button round
                        block
                        type="primary"
                        @click="reset()">
              重置
            </van-button>
          </div>
        </van-form>
        <a href="javascript:void(0)"
           @click="toggle('resgister')">立即注册</a>
      </div>

      <div class="login-box"
           v-else>
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field v-model="registerData.phone"
                       name="phone"
                       center
                       label="手机号"
                       placeholder="手机号"
                       :rules="[{ required: true, message: '请输入手机号' }]">
              <template #button>
                <van-button size="small"
                            type="primary" @click="sendCaptcha()">发送验证码</van-button>
              </template>
            </van-field>
            <van-field v-model="registerData.password"
                       type="password"
                       name="password"
                       label="密码"
                       placeholder="密码"
                       :rules="[{ required: true, message: '请输入密码' }]" />
            <van-field v-model="registerData.nickname"
                       name="nickname"
                       label="昵称"
                       placeholder="昵称"
                       :rules="[{ required: true, message: '请输入昵称' }]" />
            <van-field v-model="registerData.captcha"
                       name="captcha"
                       label="验证码"
                       placeholder="验证码"
                       :rules="[{ required: true, message: '请输入验证码' }]" />
          </van-cell-group>
          <div style="margin: 16px;">
            <van-button round
                        block
                        type="primary"
                        native-type="submit">
              注册
            </van-button>
          </div>
        </van-form>
        <a href="javascript:void(0)"
           @click="toggle('login')">已有账号</a>
      </div>
      <van-button color="#7232dd"
                  plain
                  to="home">返回首页</van-button>
    </div>
  </div>

</template>
<script>
import Header from '../../components/Header.vue'
import { reactive, toRefs, onMounted, ref } from 'vue'
import { login, register, captcha } from '../../service/index'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'

export default {
  components: {
    Header
  },
  setup() {
    const loginForm = ref(null);
    const router = useRouter();
    const data = reactive({
      type: 'login',
      loginData: {
        phone: '',
        password: ''
      },
      registerData: {
        phone: '',
        password: '',
        nickname: '',
        captcha: ''
      }
    })
    onMounted(() => {

    })

    const onSubmit = async (values) => {
      if (data.type == 'login') {
        const res = await login(values)
        if (res.code === 200) {
          localStorage.setItem('token', JSON.stringify(res));
          router.push('/')
        }
      } else {
        const result = await register(values)
        if (res.code === 200) {
          Toast.success('注册成功');
        } else {
          Toast.fail(res.message);
        }
      }
    }

    const sendCaptcha = async () => {
      if (data.registerData.phone) {
        await captcha({phone : data.registerData.phone})
        if (res.code === 200) {
          Toast.success('发送成功，请注意查收！')
        }
      }
    }

    const reset = () => {
      data.loginData.phone = ''
      data.loginData.password = ''
    }

    const toggle = (v) => {
      data.type = v;
    }

    return {
      ...toRefs(data),
      toggle,
      onSubmit,
      reset,
      sendCaptcha
    }
  },
}
</script>
<style lang="less" scoped>
html,
body {
  height: 100%;
  .bg {
    height: 100%;
    background-color: #f8f8f8;
  }
}
.main {
  padding: 50px 30px;
  .logo {
    img {
      width: 100px;
      height: 100px;
    }
  }
  .login-box {
    margin: 20px auto;
    max-width: 414px;
  }
}
</style>