import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    isNavOpen: false,
    isAuthenticated: false,
    token: '',
  },
  mutations: {
    toggleNav(state) {
      state.isNavOpen = !state.isNavOpen
    },
    initializeStore() {
      // login, authenticated or not
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
      } else {
        state.token = ''
        state.isAuthenticated = false
      }
    },
    setToken(state, token) {
      // login
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state) { 
      // logout
      state.token = ''
      state.isAuthenticated = false
    }
  },
  actions: {
  },
});
