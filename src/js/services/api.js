'use strict';

import Vue from 'vue';

export function retrieveAccounts() {
  return Vue.http.get('https://api.monzo.com/accounts', {
    headers: {
      'Authorization': `Bearer ${localStorage.accessToken}`,
    },
  });
}
