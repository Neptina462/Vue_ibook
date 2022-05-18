import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import './assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(ElementUI)
//请求根路径
axios.defaults.baseURL = 'https://127.0.0.1:8888/'

// 请求拦截，预加载token，预添加令牌
//axios.interceptors.request.use(config => {
//  console.log(config);
//  config.headers.Authorization = window.sessionStorage.getItem('token');
//})
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
