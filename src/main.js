import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router'
import store from './plugins/store';
import inputBox from "./components/fields/inputBox";
import textareaBox from "./components/fields/textarea-box";
import selectBox from "./components/fields/select_box";
import multiselectBox from "./components/fields/multiselect_box";
import panelbox from "./components/regular/panelbox";
import tabsbox from "./components/regular/tabsbox";
import mediafile from "./components/fields/mediafile";
import checkboxBox from "./components/fields/checkbox";
import universal_field from "./components/fields/universal_field";
import button_box from "./components/fields/button_box";
import error from "@/components/regular/error";

import filters from "./plugins/filters";

Object.keys(filters).map(filter => {
  Vue.filter(filter, filters[filter]);
})

import './assets/css/style.scss'

Vue.config.productionTip = false
Vue.component('error', error)
Vue.component('inputBox', inputBox)
Vue.component('button_box', button_box)
Vue.component('textareaBox', textareaBox)
Vue.component('selectBox', selectBox)
Vue.component('checkbox', checkboxBox)
Vue.component('multiSelect', multiselectBox)
Vue.component('mediafile', mediafile)
Vue.component('panelbox', panelbox)
Vue.component('tabsbox', tabsbox)
Vue.component('universal_field', universal_field)
Vue.component('html-editor', () => import('./components/fields/html_editor'))
Vue.component('modal', () => import('./components/regular/modal'))

import 'froala-editor/js/froala_editor.min.js'
import 'froala-editor/js/plugins.pkgd.min'

// Require Froala Editor css files.
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/froala_style.min.css'

// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg'
Vue.use(VueFroala)

import icon from "./components/regular/icon";
Vue.component('icon', icon)

import viewport from "./plugins/viewport";
Vue.use(viewport)

import VCalendar from 'v-calendar';
Vue.use(VCalendar);

import miniNav from "./components/miniNav";
Vue.component('mini-nav', miniNav)

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper.scss'
Vue.use(VueAwesomeSwiper)

import settings from "./settings";
Vue.prototype.$settings = settings

Vue.prototype.$basePath = '/'

import VueMask from 'v-mask'
Vue.use(VueMask)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
