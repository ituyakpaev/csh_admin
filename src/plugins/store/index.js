import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router";
import users from "@/middleware/api/v1/requests/users";
import user from "@/plugins/store/user";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    AUTH: true,
    SESSION: null,
    COMMON_DATA_PLACED: false,

    USERINFO: {
      is_admin: true,
      is_superuser: false,
      is_active: false,
      picture: '',
      full_name: '',
      email: '',
      phone: '',
      id: ''
    },

    SHOPINFO: {
      name: ''
    },

    LANG: {
      active: 'en',
      default: null,
      connected: {}
    },
    CURRENCIES: {},

    PRICES: {
      price_types: [],
      currencies: [],
      active: 'rub'
    },

    MENU: {
      show: false
    },


  },
  mutations: {
    setLangs(state, payload) {
      console.log(payload)
      state.LANG.connected = payload
    },

    setLang(state, lang) {
      state.LANG.active = lang
    },

    setStatus(state, payload) {
      state[payload.key] = !!payload.state
    },

    setAuth(state, payload) {
      state.AUTH = !!(payload.state)
      if (payload.state) {
        state.SESSION =  payload.token
        localStorage.setItem('admin_session_id', payload.token)

        if (router.currentRoute.name === 'auth') {
          router.push({ name: 'home' })
        }
      } else {
        state.SESSION = ""
        localStorage.removeItem('admin_session_id')

        if (router.currentRoute.name !== 'auth') {
          router.push({ name: 'auth', query: { redirect: router.currentRoute.name }})
        }
      }
    },

    setShopInfo(state, payload) {
      state.SHOPINFO.name = payload.name
      if (payload.default_language) {
        state.LANG.default = payload.default_language
      }
    },

    setPrices(state, payload) {
      if (payload.price_types) {
        state.PRICES.price_types = payload.price_types
      }
      if (payload.currencies) {
        state.PRICES.currencies = payload.currencies
      }
    },

    setCurrencies(state, payload) {
      state.PRICES.currencies = payload.currencies
    },

    menu(state, payload) {
      state.MENU.show = !!payload
    }
  },
  actions: {
    getCommonInfo: async function (context, userdata = null) {
      context.commit('setStatus', {
        key: 'COMMON_DATA_PLACED',
        state: false
      })

      console.log(userdata)

      await new Promise((resolve, reject) => {
        if (userdata) reject()

        users.getUser('me')
            .then(res => {
              context.commit('USER/setUser', res.data)
              context.commit('USER/setRights', res.data)
              resolve(true)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
      })

      context.commit('setStatus', {
        key: 'COMMON_DATA_PLACED',
        state: true
      })
    },
    exit({ commit }) {
      localStorage.removeItem('admin_session_id')
      commit('setAuth', false)
    }
  },
  modules: {
    USER: user
  },
})
