// 搜索当前目录下符合命名的 vue 组件，注册为全局Vue组件

import Vue from 'vue'

const components = require.context('./', true, /\.vue$/)

components.keys().forEach(key => {
  const component = components(key).default
  // 由于require的是一个class，在ie中无法覆盖name，导致component.name永远都是'VueComponent'，所以只能获取vue文件名作为注册组件名
  const name = key.replace(/.*\//g, '').replace(/\.vue/, '')
  Vue.component(name, component)
})
