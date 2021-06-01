import Vue from 'nativescript-vue'
import VueDevtools from 'nativescript-vue-devtools'
import axios from 'axios'
import NSVueShadow from 'nativescript-vue-shadow'

import Login from './views/Login'
import Home from './views/Home'
import Tasks from './views/Tasks'
import LandingPage from './views/LandingPage'
import Pomodoro from './views/Pomodoro'

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
import store from './store'

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement(
  'CheckBox',
  () => require('@nstudio/nativescript-checkbox').CheckBox,
  {
    model: {
      prop: 'checked',
      event: 'checkedChange'
    }
  }
)
Vue.registerElement("DropDown", () => require("nativescript-drop-down/drop-down").DropDown)

Vue.use(NSVueShadow)


const PROD_BACK_URL = 'https://onefocus.herokuapp.com'

// IP Address - for tns preveiw (although I dont think it works anyway)
// const DEV_URL = 'http://192.168.1.126:8000'
// Emulator url
const DEV_URL = 'http://10.0.2.2:5000'

axios.defaults.baseURL = DEV_URL


new Vue({
  store,
  render: h => h('frame', [h(Tasks)])
}).$start()
