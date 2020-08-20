// import axios from 'axios'


// export const state = () => ({
//   user: {
//     login: false,
//     name: "",
//     email: "",
//     photo: ""
//   }
// })

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  }
}

// export const mutations = {
//   async logget(email) {
//     try {
//       const User = await getUser(email)
//       if (User) {
//         // state.user.{login, email, name, photo} = {true, ...User}
//         state.user.login = true
//         state.user.email = User.email
//         state.user.name  = User.name
//         state.user.photo = User.photo
//       }
//     } catch(e) {
//       throw new Error(e)
//     }
//   },
//   async setBio(user) {
//     try {
//       const User = await getUser(email)
//     } catch (e) {
      
//     }
//   }
// }




// export const mutations = {
//   SET_USER (state, user) {
//     state.authUser = user
//   }
// }

// export const actions = {
//   // nuxtServerInit is called by Nuxt.js before server-rendering every page
//   nuxtServerInit ({ commit }, { req }) {
//     if (req.session && req.session.authUser) {
//       commit('SET_USER', req.session.authUser)
//     }
//   },
//   async login ({ commit }, { username, password }) {
//     try {
//       const { data } = await axios.post('/api/login', { username, password })
//       commit('SET_USER', data)
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         throw new Error('Bad credentials')
//       }
//       throw error
//     }
//   },

//   async logout ({ commit }) {
//     await axios.post('/api/logout')
//     commit('SET_USER', null)
//   }

// }
