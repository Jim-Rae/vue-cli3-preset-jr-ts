import { Route } from 'vue-router'

// 不常用路由组件单独打包
const Login = () => import(/* webpackChunkName: "login" */ './index.vue')

export default {
  path: '/login',
  name: 'login',
  component: Login,

  // 路由独享守卫
  beforeEnter (to: Route, from: Route, next: any) {
    next()
  }
}
