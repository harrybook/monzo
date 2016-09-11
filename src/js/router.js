'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../vue/pages/Home.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  base: __dirname,
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '*', redirect: '/' },
  ],
});

export default router;
