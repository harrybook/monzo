import { sync } from 'vuex-router-sync';
import Vue from 'vue';
import VueResource from 'vue-resource';
import { handleError, handleToken } from './session';
import * as filters from './filters';
import App from '../vue/App.vue';
import router from './router';
import store from './vuex/store';

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

Vue.use(VueResource);

Vue.http.interceptors.push(handleToken);
Vue.http.interceptors.push(handleError);

sync(store, router);

export default new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
