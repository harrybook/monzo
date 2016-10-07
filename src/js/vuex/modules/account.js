/* eslint-disable no-param-reassign */
const initialState = {
  data: {},
  error: null,
  loading: true,
};

function accountError(state, error) {
  state.error = error;
  state.loading = false;
}

function accountReceive(state, account) {
  state.data = account;
  state.loading = false;
}

function accountRetrieve(state) {
  state.data = {};
  state.error = null;
  state.loading = true;
}

export default {
  mutations: {
    accountError,
    accountReceive,
    accountRetrieve,
  },
  state: initialState,
};
