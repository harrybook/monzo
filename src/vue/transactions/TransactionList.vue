<template>
  <div class="c-transaction-list">
    <ul>
      <li v-for="transaction in transactions.items">
        {{ transaction.merchant ? transaction.merchant.emoji : '' }} <router-link :to="'/transaction/' + transaction.id">{{ transaction.description }}</router-link>
        <div>
          <strong>Amount:</strong> {{ transaction.amount / 100 | currency }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    transactions() {
      return this.$store.state.transactions;
    },
  },
}
</script>
