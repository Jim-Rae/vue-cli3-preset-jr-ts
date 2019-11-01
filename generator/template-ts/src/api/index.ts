import http from './axios-config'
// import mockData from './mock'
import qs from 'qs'
import Vue, { VueConstructor } from 'vue'

// 是否开启模拟数据
// const mockSwitch = false

const api = {
  // GET方法示例（简洁配置）
  getList: (): any => http.get('/api/getList'),

  // GET方法示例（细粒度配置）
  // getList () {
  //   // 是否使用模拟数据
  //   if (mockSwitch) {
  //     return Promise.resolve(mockData.news)
  //   } else {
  //     // 对返回数据进行过滤或操作
  //     return http.get('/api/getList')
  //       .then(res => {
  //         // 根据实际情况处理成功返回的数据
  //         // 如：
  //         // if (res.status) {
  //         //   return Promise.resolve(res.list)
  //         // } else {
  //         //   return Promise.resolve(res.list2)
  //         // }
  //         return Promise.resolve(res)
  //       })
  //       .catch(err => {
  //         return Promise.reject(err)
  //       })
  //   }
  // },

  // POST方法示例(json)
  postData: (data: any): any => http.post('/api/postData', data),

  // POST方法示例(x-www-form-urlencoded)
  postDataByxForm: (data: any): any => http.post('/api/postData', qs.stringify(data)),

  // POST方法示例(form-data)
  // 直接传一个FormData对象即可

  // 登录
  login: (data: any): any => http.post('/api/login', data),

  // 获取用户信息
  getUserInfo: (): any => http.get('/api/getUserInfo'),

  // 退登
  logout: (): any => http.get('/api/logout')

}

// 扩展vue的interface
declare module 'vue/types/vue' {
  interface Vue {
    // eslint-disable-next-line
    $_api: any
  }
}

export default {
  install (Vue: VueConstructor<Vue>) {
    Vue.mixin({
      created () {
        (this as Vue).$_api = api
      }
    })
  }
}

export { api as Api }
