import { Api } from '@/api'
import router from '@/router'
import { ActionContext } from 'vuex'

export interface State {
  userInfo: any
}

const state: State = {
  userInfo: {}
}

const getters = {
  userType: (state: State) => state.userInfo.type,
  username: (state: State) => state.userInfo.username
}

const mutations = {
  setUserInfo (state: State, userInfo: any) {
    state.userInfo = userInfo
  }
}

const actions = {
  getRouteInfo ({ rootState }: ActionContext<State, any>) {
    console.log('routeInfo: ', rootState.route)
  },

  async getUserInfo ({ commit }: ActionContext<State, any>) {
    try {
      const res = await Api.getUserInfo()
      if (res.status) {
        commit('setUserInfo', res.data)
        return res.data
      } else {
        router.push({ name: 'login' })
      }
    } catch (error) {
      console.log(error)
    }
  },

  async logout ({ commit }: ActionContext<State, any>) {
    try {
      const res = await Api.logout()
      if (res.status) {
        commit('setUserInfo', {})
        router.push({ name: 'login' })
      } else {
        console.log(res.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
