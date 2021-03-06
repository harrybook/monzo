import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import accounts from './modules/accounts';
import balance from './modules/balance';
import transaction from './modules/transaction';
import transactions from './modules/transactions';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  modules: {
    accounts,
    balance,
    transaction,
    transactions,
  },
  strict: true,
});
