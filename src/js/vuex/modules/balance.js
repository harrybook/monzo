'use strict';

const initialState = {
  data: {},
  error: null,
  loading: true,
};

function balanceError(state, error) {
  state.error = error;
  state.loading = false;
}

function balanceReceive(state, balance) {
  state.data = balance;
  state.loading = false;
}

function balanceRetrieve(state) {
  state.data = {};
  state.error = null;
  state.loading = true;
}

export default {
  mutations: {
    balanceError,
    balanceReceive,
    balanceRetrieve,
  },
  state: initialState,
};
