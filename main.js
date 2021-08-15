import Vue from 'vue'
import App from './App'
import uView from "uview-ui"
import store from '@/store/index.js'  

Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

// uni.addInterceptor('request', {
//   invoke(args) {
//     // request 触发前拼接 url 
//     args.url = 'http://api.hanfuc.com:801'+args.url
//   },
//   success(args) {
//     // 请求成功后，修改code值为1 
// 	console.log('interceptor-success', args)
//   }, 
//   fail(err) {
//     console.log('interceptor-fail',err)
//   }, 
//   complete(res) {
//     console.log('interceptor-complete',res)
//   }
// })

const app = new Vue({
    ...App,
	store
})
app.$mount()
