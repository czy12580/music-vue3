import axios from '../utils/axios'

// 登录
export function login(params) {
    return axios.post('/login/cellphone', params)
}

// 注册
export function register(params) {
    return axios.post('/register/cellphone', params)
}

export function getUserInfo(params) {
    return axios.get('/user/detail?uid=' + params)
}

// 发送验证码
export function captcha(params) {
    return axios.get('/captcha/sent?phone=' + params.phone)
}

// 退出登录
export function logout() {
    return axios.get('/logout')
}

// 轮播图
export function getBanner() {
    return axios.get('/banner?type=2');
}