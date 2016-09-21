'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Accounts from '../vue/pages/Accounts.vue';
import Callback from '../vue/pages/Callback.vue';
import Login from '../vue/pages/Login.vue';
import Logout from '../vue/pages/Logout.vue';

Vue.use(VueRouter);

function requireAuth(route, redirect, next) {
  if (!localStorage.accessToken) {
    return redirect({
      path: '/login',
      // query: { to: route.fullPath },
    });
  }

  next();
}

const router = new VueRouter({
  base: __dirname,
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/logout', component: Logout },
    { path: '/callback', component: Callback },
    { path: '/accounts', component: Accounts, beforeEnter: requireAuth },
    { path: '*', redirect: '/' },
  ],
});

export default router;
