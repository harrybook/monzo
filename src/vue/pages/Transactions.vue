<template>
  <div class="c-transactions">
    <p v-if="transactions.loading">Loading...</p>
    <transaction-list v-else></transaction-list>
  </div>
</template>

<script>
import TransactionList from '../transactions/TransactionList.vue';

export default {
  components: {
    TransactionList,
  },
  computed: {
    transactions() {
      return this.$store.state.transactions;
    },
  },
  created() {
    this.$store.dispatch('retrieveTransactions', this.$route.params.id);
  },
};
</script>
