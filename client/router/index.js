import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'
import HomeRouter from './Home'
import LoginRouter from './login'
import RegistRouter from './regist'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    ...LoginRouter,
    ...RegistRouter,
    ...HomeRouter
  ]
})

// 路由守衛設置
router.beforeEach( async (to, from, next) => {
  // 是否已身份確認
  if (!store.getters.isAuthChecked){
    await store.dispatch('checkAuth')
  }

  // 登入用戶不能造訪之頁面
  if(to.meta.requireNotLogin && store.getters.isLogin)
    return next('/')

  next()
})

export default router
