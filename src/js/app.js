'use strict';

import { sync } from 'vuex-router-sync';
import Vue from 'vue';
import VueResource from 'vue-resource';
import App from '../vue/App.vue';
import config from '../../config';
import * as filters from './filters';
import router from './router';
import store from './vuex/store';

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.use(VueResource);

Vue.http.options.root = config.api.url;

sync(store, router);

export default new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
