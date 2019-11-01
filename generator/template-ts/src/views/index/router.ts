import { importAll } from '@/utils/routerHelper'
import Index from './index.vue'
import Store from '@/store'
import { Route } from 'vue-router'
import router from '@/router'

// 加载子路由
const ctx = require.context('./children', true, /childRouter.ts$/)
const childRoutes = importAll(ctx)

export default {
  path: '/index',
  component: Index,
  children: childRoutes,
  // 路由独享守卫
  async beforeEnter (to: Route, from: Route, next: any) {
    if (await Store.dispatch('user/getUserInfo')) {
      next()
    } else {
      router.push({ name: 'login' })
    }
  }
}
