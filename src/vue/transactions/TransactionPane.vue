<template>
  <div class="c-transaction-pane">
    <p v-if="transaction.loading">Loading...</p>
    <template v-else>
      <h1>{{ title }}</h1>
      <ul>
        <li>{{ transaction.data.merchant ? transaction.data.merchant.emoji : '' }}</li>
        <li><strong>Amount:</strong> {{ transaction.data.amount / 100 | currency }}</li>
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  computed: {
    title() {
      if (this.transaction.data.merchant) {
        return this.transaction.data.merchant.name;
      }

      if (this.transaction.data.counterparty) {
        return this.transaction.data.counterparty.name;
      }

      return this.transaction.data.description;
    },
    transaction() {
      return this.$store.state.transaction;
    },
  },
}
</script>
