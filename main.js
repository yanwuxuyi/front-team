import App from './App'
import echarts from 'echarts'
import 'echarts-gl'
import 'echarts-stat'

// #ifndef VUE3
import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
	ak:"0lPULNZ5PmrFVg76kFuRjezF"
})
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
// main.js
import uView from 'uview-ui';
Vue.use(uView);
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { test } from '@/uni_modules/uview-plus';
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif