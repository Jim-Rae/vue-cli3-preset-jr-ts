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
      const data = await Api.getUserInfo()
      commit('setUserInfo', data)
      return data
    } catch (error) {
      console.error(error)
      return false
    }
  },

  async logout ({ commit }: ActionContext<State, any>) {
    try {
      await Api.logout()
      commit('setUserInfo', {})
      router.push({ name: 'login' })
    } catch (error) {
      console.error(error)
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
