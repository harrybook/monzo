'use strict';

const initialState = {
  error: null,
  items: [],
  loading: true,
};

function accountsError(state, error) {
  state.error = error;
  state.loading = false;
}

function accountsReceive(state, attendees) {
  state.loading = false;
  state.items = attendees;
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
