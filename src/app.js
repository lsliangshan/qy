// Import Vue
import Vue from 'vue';

// Import Vuex
import Vuex from 'vuex';

import store from './store';

import mixins from './mixins';

// Import F7
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import F7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import IconsStyles from './css/icons.css';
import AppStyles from './css/app.css';

// Import App Component
import App from './app.vue';

// register global mixins.
Vue.mixin(mixins)

Vue.use(Vuex)

// Init F7 Vue Plugin
Framework7.use(Framework7Vue)

// Init App
new Vue({
  el: '#app',
  store,
  template: '<app/>',

  // Register App Component
  components: {
    app: App
  }
});
