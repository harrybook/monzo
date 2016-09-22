'use strict';

const initialState = {
  error: null,
  items: [],
  loading: true,
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

export default {
  mutations: {
    transactionsError,
    transactionsReceive,
    transactionsRetrieve,
  },
  state: initialState,
};
