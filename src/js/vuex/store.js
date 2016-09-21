'use strict';

import accounts from './modules/accounts';
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  modules: {
    accounts,
  },
  strict: true,
});
