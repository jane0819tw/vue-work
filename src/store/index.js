import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    testStore: [2, 3, 4],
    count: 1
  },
  mutations: {
    addCount(state, obj) {
      // setTimeout(() => {
      //   state.count += obj.num
      // }, 1000)
      state.count += obj.num
      // state.count += 20
    }
  },
  actions: {
    update(context, obj) {
      setTimeout(() => {
        context.commit('addCount', obj)
      }, 1000)

    },

    update2({ commit, dispatch }, obj) {

      dispatch('update', obj)
      commit('addCount', obj)
    }
  },
  modules: {
  }
})
