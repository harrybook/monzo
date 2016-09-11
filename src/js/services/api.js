'use strict';

import Vue from 'vue';

export function createUser(params) {
  return Vue.http.post('users', params);
}
