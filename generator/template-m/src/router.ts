import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import { importAll } from '@/utils/routerHelper'

// 全局路由
class GlobalRouter {
  routes: RouteConfig[]

  constructor () {
    // 路由表
    this.routes = []
    // 初始化
    this.init()
  }

  init () {
    Vue.use(Router)

    // 设置默认路由
    this.setDefaultRoute()
    // 设置导入的路由
    this.setImportRoute()
  }

  // 设置默认路由
  setDefaultRoute () {
    // 默认路由
    const defaultPath = [
      // 任意路由
      {
        path: '*',
        redirect: '/'
      },
      // 默认路由
      {
        path: '/',
        redirect: { name: 'index' }
      }
    ]
    this.routes.push(...defaultPath)
  }

  // 设置导入的路由
  setImportRoute () {
    // webpack文档规定： require.context参数只接收字面量，不要用变量去控制
    const ctx = require.context('./views', true, /router.ts$/)
    let routes = importAll(ctx)
    this.routes.push(...routes)
  }
}

let routes = new GlobalRouter().routes

const instance = new Router({
  routes
})

instance.beforeEach((to, from, next) => {
  next()
})

// 刷新viewport-units-buggyfill
instance.afterEach((to, from) => {
  require('viewport-units-buggyfill').refresh()
})

export default instance

export { routes }
