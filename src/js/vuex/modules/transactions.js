'use strict';

const initialState = {
  error: null,
  items: [],
  loading: true,
  showPane: false,
};

function transactionsError(state, error) {
  state.error = error;
  state.loading = false;
}

function transactionsReceive(state, transactions) {
  state.loading = false;
  state.items = transactions;
}

function transactionsRetrieve(state) {
  state.error = null;
  state.loading = true;
  state.items = [];
}

function transactionsShowPane(state, show) {
  state.showPane = show;
}

export default {
  mutations: {
    transactionsError,
    transactionsReceive,
    transactionsRetrieve,
    transactionsShowPane,
  },
  state: initialState,
};
