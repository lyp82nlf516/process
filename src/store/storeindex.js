import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);
import userz from './modules/userz.js'
export default new vuex.Store({
  modules: {
    user: userz
  }
})
