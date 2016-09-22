'use strict';

import Vue from 'vue';

export function retrieveAccounts() {
  return Vue.http.get('https://api.monzo.com/accounts', {
    headers: {
      'Authorization': `Bearer ${localStorage.accessToken}`,
    },
  });
}

export function retrieveTransactions(accountId) {
  return Vue.http.get(`https://api.monzo.com/transactions?expand[]=merchant&account_id=${accountId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.accessToken}`,
    },
  });
}
