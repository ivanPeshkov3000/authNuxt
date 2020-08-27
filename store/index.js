// import axios from 'axios'


export const state = () => ({
  errors: null
})

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },

  error(state) {
    return state.errors
  }
}


export const mutations = {
  // SET_USER (state, user) {
  //   state.auth.user = user
  // },
  ERROR_CATCH (error) {
    state.error = error
  }
}

export const actions = {
  // nuxtServerInit ({ commit }, { req }) {
  //   if (req.session && req.session.auth.user) {
  //     commit('SET_USER', req.session.auth.user)
  //   }
  // },
  // async login ({ commit }, { username, password }) {
  //   try {
  //     const { data } = await axios.post('/api/login', { username, password })
  //     commit('SET_USER', data)
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       throw new Error('Bad credentials')
  //     }
  //     throw error
  //   }
  // },

  // async logout ({ commit }) {
  //   await axios.post('/api/logout')
  //   commit('SET_USER', null)
  // },

  errorCatch ({ commit }, { error }) {
    if (error) commit('ERROR_CATCH', error)
  }
}
