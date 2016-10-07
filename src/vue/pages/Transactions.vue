<template>
  <div class="c-transactions">
    <div class="c-transactions__container">
      <transaction-header></transaction-header>
      <div class="c-transactions__list">
        <loader v-if="transactions.loading"></loader>
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
import Loader from '../common/Loader.vue';

export default {
  components: {
    Loader,
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
@import '../../sass/variables';

.c-transactions__container {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 50%;
}

.c-transactions__list {
  border-right: 1px solid $gallery;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  position: absolute;
  top: 100px;
  width: 100%;
}
</style>
