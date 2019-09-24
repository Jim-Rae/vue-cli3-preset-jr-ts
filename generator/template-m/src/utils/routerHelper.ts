/**
 * @Desc 路由处理
 */

import { RouteConfig } from 'vue-router'
import { routes as Routes } from '@/router'
import { fastCopy } from './common'

declare class VueRouter {
  options: RouteConfig[]
}

class RouterHelper {
  routes: RouteConfig[] | null = null

  // 获取扁平化后的路由
  // fresh为true表示不使用缓存，每次重新求值一次
  getFlattenRoutes (fresh = false) {
    if (this.routes && !fresh) return this.routes
    this.routes = this.flattenRoutes()
    return this.routes
  }

  // 打平路由
  flattenRoutes (routes?: RouteConfig[]) {
    const rs: RouteConfig[] = []
    // 总路由
    routes = routes || fastCopy(Routes)
    routes!.forEach(r => {
      // 取出除了 children component以外的选项
      const { children, component, ...otherRouteCfg } = r
      rs.push(otherRouteCfg)
      if (children) {
        const childrenRoutes = this.flattenRoutes(children)
        rs.push(...childrenRoutes)
      }
    })
    return rs
  }
}

export default new RouterHelper()

/**
 * 动态导入路由配置
 * @param {*} ctx require.context 生成的上下文对象，用于自动导入
 */
export const importAll = (ctx: __WebpackModuleApi.RequireContext) => {
  let routes: RouteConfig[] = []
  ctx.keys().forEach((file: string) => {
    // 获取到配置
    let route = ctx(file).default
    // 可能是数组或者对象
    route = Array.isArray(route) ? route : [route]
    // 添加进路由缓存
    routes.push(...route)
  })
  return routes
}
