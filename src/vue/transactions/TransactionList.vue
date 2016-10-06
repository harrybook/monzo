<template>
  <div class="c-transaction-list">
    <div class="c-transaction-list__list">
      <div
        v-for="(items, date) in groupedTransactions"
        class="c-transaction-list__group"
      >
        <div class="c-transaction-list__date">{{ formatDate(date) }}</div>
        <div class="c-transaction-list__transactions">
          <transaction-item
            v-for="transaction in items"
            :transaction="transaction"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
import TransactionItem from './TransactionItem.vue';

export default {
  components: {
    TransactionItem,
  },
  computed: {
    groupedTransactions() {
      return _.groupBy(this.sortedTransactions, transaction => {
        return moment(transaction.created).startOf('day').valueOf();
      });
    },
    sortedTransactions() {
      return _.sortBy(this.transactions.items, transaction => {
        return moment(transaction.created).valueOf();
      }).reverse();
    },
    transactions() {
      return this.$store.state.transactions;
    },
  },
  methods: {
    formatDate(value) {
      return moment(value, 'x').format('dddd, D MMMM');
    },
  },
};
</script>

<style lang="scss">
@import '../../sass/variables';

.c-transaction-list__date {
  background: $alabaster;
  border-bottom: 1px solid $gallery;
  text-transform: uppercase;
  padding: 10px 20px;
}
</style>
