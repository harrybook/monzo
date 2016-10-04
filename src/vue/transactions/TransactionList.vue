<template>
  <div class="c-transaction-list">
    <div class="c-transaction-list__list">
      <div v-for="(items, date) in groupedTransactions" class="c-transaction-list__group">
        <div class="c-transaction-list__date">{{ formatDate(date) }}</div>
        <div class="c-transaction-list__transactions">
          <transaction-item v-for="transaction in items" :transaction="transaction"></transaction-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import TransactionItem from './TransactionItem.vue';

export default {
  components: {
    TransactionItem,
  },
  computed: {
    transactions() {
      return this.$store.state.transactions;
    },
    sortedTransactions() {
      return _.sortBy(this.transactions.items, transaction => {
        return new Date(transaction.created).getTime();
      }).reverse();
    },
    groupedTransactions() {
      return _.groupBy(this.sortedTransactions, transaction => {
        const date = new Date(transaction.created);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
      });
    },
  },
  methods: {
    formatDate(date) {
      date = new Date(parseInt(date, 10));
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
    },
    hidePane() {
      this.$store.commit('transactionsShowPane', false);
    },
  },
};
</script>

<style lang="scss">
.c-transaction-list__date {
  background: #f9f9f9;
  border-bottom: 1px solid #ededed;
  text-transform: uppercase;
  padding: 10px 20px;
}
</style>
