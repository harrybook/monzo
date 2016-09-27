<template>
  <div class="c-transaction-list">
    <pane v-if="transactions.showPane" @close="hidePane">
      <transaction-pane @close="hidePane"></transaction-pane>
    </pane>
    <ul>
      <transaction-item v-for="transaction in transactions.items" :transaction="transaction"></transaction-item>
    </ul>
  </div>
</template>

<script>
import Pane from '../common/Pane.vue';
import TransactionItem from './TransactionItem.vue';
import TransactionPane from './TransactionPane.vue';

export default {
  components: {
    Pane,
    TransactionItem,
    TransactionPane,
  },
  computed: {
    transactions() {
      return this.$store.state.transactions;
    },
  },
  methods: {
    hidePane() {
      this.$store.commit('transactionsShowPane', false);
    },
  },
}
</script>
