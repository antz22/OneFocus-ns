import Vue from 'nativescript-vue'
import Home from './components/Home'
import Login from './components/Login'
import VueDevtools from 'nativescript-vue-devtools'
import axios from 'axios'

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
import store from './store'

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

const PROD_BACK_URL = 'https://onefocus.herokuapp.com'
// const DEV_URL = 'http://192.168.1.126:8000'
const DEV_URL = 'http://10.0.2.2:5000'

axios.defaults.baseURL = DEV_URL
// axios.defaults.baseURL = PROD_BACK_URL


new Vue({
  store,
  render: h => h('frame', [h(Login)])
}).$start()
