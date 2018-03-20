import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/vuex/store'
import Axios from 'axios'

Vue.use(Router)

const Index = r => require.ensure([], () => r(require('@/pages/index')), 'Index')
const Login = r => require.ensure([], () => r(require('@/pages/login')), 'Login')
const Comment = r => require.ensure([], () => r(require('@/pages/comment')), 'Comment')
const CommentDetail = r => require.ensure([], () => r(require('@/pages/commentDetail')), 'CommentDetail')
const Root = r => require.ensure([], () => r(require('@/pages/root')), 'Root')
const Food = r => require.ensure([], () => r(require('@/pages/food')), 'Food')
const AddFood = r => require.ensure([], () => r(require('@/pages/addFood')), 'AddFood')

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        auth: false // 是否需要验证
      }
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
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
    }, {
      path: '/root',
      component: Root,
      meta: {
        auth: true // 是否需要验证
      }
    }, {
      path: '/food',
      component: Food,
      meta: {
        auth: false // 是否需要验证
      }
    }, {
      path: '/addfood',
      component: AddFood,
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
    Axios.get('/userInfo').then(res => {
      // 储存用户信息
      if (res.data.status === 0) {
        Store.commit('storeStatus', res.data.data)
        Store.commit('isRootStatus', res.data.data.level === 'root' ? true : false)
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