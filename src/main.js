import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import VueResource from 'vue-resource'//ajax控件
import store from './store/index.js'
import util from '@/util.js'//自定义控件，包装一些常用函数
//css依赖
import "./assets/css/web-reset.css";
Vue.use(VueResource);
Vue.config.productionTip = false
Vue.use(util);
//IE兼容模式 console报错问题处理
if(!window.console){
  window.console = {};
}
if(!window.console.log){
  window.console.log = function(msg){};
}
new Vue({
  // router,
  store,
  render: h => h(App)
}).$mount('#app')
