<template>
  <div class="c-transaction-detail">
    <p v-if="transaction.loading">Loading...</p>
    <transaction-info v-else></transaction-info>
  </div>
</template>

<script>
import TransactionInfo from './TransactionInfo.vue';

export default {
  components: {
    TransactionInfo,
  },
  computed: {
    transaction() {
      return this.$store.state.transaction;
    },
  },
};
</script>

<style lang="scss">
.c-transaction-detail {
  height: 100%;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 50%;
}
</style>
