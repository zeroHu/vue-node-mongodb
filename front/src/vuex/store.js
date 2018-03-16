import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loginStatus: null,
    isRoot: false,
  },
  mutations: {
    storeStatus (state, userinfo) {
      state.loginStatus = userinfo
    },
    isRootStatus (state, val) {
        state.isRoot = val
    }
  }
})

export default store