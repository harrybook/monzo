'use strict';

const initialState = {
  data: {},
  error: null,
  loading: true,
};

function transactionError(state, error) {
  state.error = error;
  state.loading = false;
}

function transactionReceive(state, transaction) {
  state.data = transaction;
  state.loading = false;
}

function transactionRetrieve(state) {
  state.data = {};
  state.error = null;
  state.loading = true;
}

export default {
  mutations: {
    transactionError,
    transactionReceive,
    transactionRetrieve,
  },
  state: initialState,
};
