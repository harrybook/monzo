import Vue from 'vue';

export function retrieveAccounts() {
  return Vue.http.get('https://api.monzo.com/accounts');
}

export function retrieveBalance(accountId) {
  return Vue.http.get(`https://api.getmondo.co.uk/balance?account_id=${accountId}`);
}

export function retrieveTransactions(accountId) {
  return Vue.http.get(`https://api.monzo.com/transactions?expand[]=merchant&account_id=${accountId}`);
}

export function retrieveTransaction(transactionId) {
  return Vue.http.get(`https://api.getmondo.co.uk/transactions/${transactionId}?expand[]=merchant`);
}
