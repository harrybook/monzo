'use strict';

import * as api from '../services/api';

export function retrieveAccounts({ commit }) {
  commit('accountsRetrieve');
  api.retrieveAccounts().then(response => {
    commit('accountsReceive', response.json().accounts);
  }, response => {
    // commit('accountsError', response.data.error.message);
  });
}
