import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loginStatus: null
  },
  mutations: {
    storeStatus (state, userinfo) {
      state.loginStatus = userinfo
    }
  }
})

export default store