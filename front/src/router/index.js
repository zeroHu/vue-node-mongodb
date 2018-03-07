import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Index from '@/pages/index'
import Comment from '@/pages/comment'
import CommentDetail from '@/pages/commentDetail'
import Store from '@/vuex/store'
import Axios from 'axios'

Vue.use(Router)


const router = new Router({
  mode: 'history',
  routes: [{
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        auth: false // 是否需要验证
      }
    }, {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        auth: false // 是否需要验证
      }
    }, {
      path: '/comment',
      component: Comment,
      meta: {
        auth: false // 是否需要验证
      }
    }, {
      path: '/commentdetail',
      component: CommentDetail,
      meta: {
        auth: true // 是否需要验证
      }
    }]
});

// 路由判断状态
router.beforeEach((to, from, next) => {
  let userInfo = Store.state.loginStatus
  // 如果vuex 没有存储用户信息的时候去请求session里面是否有用户登录信息
  if (!userInfo) {
    Axios.get('/api/userInfo').then(res => {
      // 储存用户信息
      if (res.data.status === 0) {
        Store.commit('storeStatus', res.data.data)
      }
      // 需要校验的路由
      if (to.matched.some( m => m.meta.auth) && !Store.state.loginStatus) {
        next({ path:'/login', query:{ referrer: to.fullPath} })
      } else {
        next()
      }
    })
  } else {
    next()
  }
})

export default router