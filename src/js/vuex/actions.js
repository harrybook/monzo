import * as api from '../api';

export function retrieveAccounts({ commit }) {
  commit('accountsRetrieve');
  api.retrieveAccounts()
    .then((response) => {
      commit('accountsReceive', response.body.accounts);
    })
    .catch(() => {
      // commit('accountsError', response.data.error.message);
    });
}

export function retrieveBalance({ commit }, accountId) {
  commit('balanceRetrieve');
  api.retrieveBalance(accountId)
    .then((response) => {
      commit('balanceReceive', response.body);
    })
    .catch(() => {
      // commit('balanceError', response.data.error.message);
    });
}

export function retrieveTransactions({ commit }, accountId) {
  commit('transactionsRetrieve');
  api.retrieveTransactions(accountId)
    .then((response) => {
      commit('transactionsReceive', response.body.transactions);
    })
    .catch(() => {
      // commit('transactionsError', response.data.error.message);
    });
}

export function retrieveTransaction({ commit }, transactionId) {
  commit('transactionRetrieve', transactionId);
  api.retrieveTransaction(transactionId)
    .then((response) => {
      commit('transactionReceive', response.body.transaction);
    })
    .catch(() => {
      // commit('transactionError', response.data.error.message);
    });
}
