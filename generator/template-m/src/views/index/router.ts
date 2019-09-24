import { Route } from 'vue-router'

// 路由组件分组打包
const Index = () => import(/* webpackChunkName: "index" */ './index.vue')

export default {
  path: '/index',
  name: 'index',
  component: Index,

  // 路由独享守卫
  beforeEnter (to: Route, from: Route, next: any) {
    next()
  }
}
