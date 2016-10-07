const initialState = {
  data: {},
  error: null,
  loading: false,
};

function transactionError(state, error) {
  state.error = error;
  state.loading = false;
}

function transactionReceive(state, transaction) {
  state.data = transaction;
  state.loading = false;
}

function transactionRetrieve(state, transactionId) {
  state.data = {
    id: transactionId,
  };
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
