const initialState = {
  error: null,
  items: [],
  loading: true,
};

function accountsError(state, error) {
  state.error = error;
  state.loading = false;
}

function accountsReceive(state, accounts) {
  state.loading = false;
  state.items = accounts;
}

function accountsRetrieve(state) {
  state.error = null;
  state.loading = true;
  state.items = [];
}

export default {
  mutations: {
    accountsError,
    accountsReceive,
    accountsRetrieve,
  },
  state: initialState,
};
