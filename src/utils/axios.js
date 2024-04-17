import axios from 'axios'
import { Toast } from 'vant'
import store from '../store'
import router from '../router'

axios.defaults.baseURL = 'https://musci-api-six.vercel.app/'
// axios.defaults.baseURL = 'http://172.22.4.79:3000/'
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/json'
    if (config.otherBaseUrl) {
        config.baseURL = 'https://api.iwyu.com/API/weibo/'
    }
    return config
});

axios.interceptors.response.use((res) => {
    const code = res.status;

    // if (typeof res.data !== 'object') {
    //     Toast.fail('服务端异常！')
    //     return Promise.reject(res)
    // }
    if (code != 200) {
        if (res.data.message) {
            Toast.fail(res.data.message);
        }
    }
    return res.data;
}, (error) => {
    Toast.fail('服务端异常！')
    return Promise.reject(error);
});

export default axios;
