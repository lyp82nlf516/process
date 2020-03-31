// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import store from './store/storeindex.js'
import router from './router'
import ElementUI from 'element-ui'
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'element-ui/lib/theme-default/index.css'
import 'babel-polyfill'
// import ECharts from 'vue-echarts/components/ECharts.vue'
import Promise from 'bluebird'
if (window.prototype !== 'undefined') {} else {
    window.prototype.promise = Promise;
}
Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.component('chart', ECharts);
// Vue.component('chart', ECharts)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})