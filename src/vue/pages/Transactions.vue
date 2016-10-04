<template>
  <div class="c-transactions">
    <div class="c-transactions__container">
      <transaction-header></transaction-header>
      <div class="c-transactions__list">
        <p v-if="transactions.loading">Loading...</p>
        <transaction-list v-else></transaction-list>
      </div>
    </div>
    <transaction-detail></transaction-detail>
  </div>
</template>

<script>
import TransactionHeader from '../transactions/TransactionHeader.vue';
import TransactionDetail from '../transactions/TransactionDetail.vue';
import TransactionList from '../transactions/TransactionList.vue';

export default {
  components: {
    TransactionHeader,
    TransactionDetail,
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

<style lang="scss">
.c-transactions__container {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 50%;
}

.c-transactions__list {
  border-right: 1px solid #e0e0e0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  position: absolute;
  top: 105px;
  width: 100%;
}
</style>
