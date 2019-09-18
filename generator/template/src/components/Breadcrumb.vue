<template>
  <div
    v-show="breadcrumb.length > 0"
    class="breadcrumb">
    <el-breadcrumb
      separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(br, index) in breadcrumb"
        :key="index"
        :to="br.route">{{br.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import RouterHelp from '@/utils/routerHelper'
import { RouteConfig } from 'vue-router'

@Component
export default class Breadcrumb extends Vue {
  breadcrumb: any[] = []

  created () {
    this.generateBreadcrumb()
  }

  // 生成面包屑
  generateBreadcrumb () {
    const rt = this.$route
    // 没有meta相关的，直接返回
    if (!rt.meta || !rt.meta.breadcrumb || !rt.meta.breadcrumb.route || rt.meta.breadcrumb.route.length === 0) {
      this.breadcrumb = []
      return
    }

    type Breadcrumb = {
      title: string,
      route: string[]
    }

    const { route: chain } = rt.meta.breadcrumb as Breadcrumb

    const rs: any[] = []
    // 把路由打平
    let routes = RouterHelp.getFlattenRoutes()
    // 路由表中找出 匹配的路由配置
    routes = routes.filter(r => chain.includes(r.name!))

    type RoutesList = {
      [name: string]: RouteConfig
    }

    // 生成 {"name1": 路由对象1， "name2": 路由对象2}
    let routesList: RoutesList = routes.reduce((acc, r) => Object.assign(acc, { [r.name as string]: r }), {})
    // 生成面包屑数据
    chain.forEach(routeName => {
      const r = routesList[routeName]
      const { path, name, meta: { breadcrumb: { title } } } = r
      // 路由表里的path可能为相对路径，只取path去跳转可能失败，故都取出来，优先使用name跳转
      const record = {
        route: { path, name },
        title
      }
      rs.push(record)
    })

    this.breadcrumb = rs
  }

  @Watch('$route')
  on$routeChanged () {
    this.generateBreadcrumb()
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/index';

.breadcrumb {
  padding: 20px;
}
</style>
