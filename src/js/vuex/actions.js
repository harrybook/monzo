'use strict';

import * as api from '../services/api';

export function retrieveAccounts({ commit }) {
  commit('accountsRetrieve');
  api.retrieveAccounts()
    .then(response => {
      commit('accountsReceive', response.json().accounts);
    })
    .catch(response => {
      // commit('accountsError', response.data.error.message);
    });
}

export function retrieveTransactions({ commit }, accountId) {
  commit('transactionsRetrieve');
  api.retrieveTransactions(accountId)
    .then(response => {
      commit('transactionsReceive', response.json().transactions);
    })
    .catch(response => {
      // commit('transactionsError', response.data.error.message);
    });
}
