<template>
  <li>
    <img v-if="transaction.merchant" :src="transaction.merchant.logo" :alt="transaction.merchant.name" width="48"><br>
    {{ transaction.merchant ? transaction.merchant.emoji : '' }} <a href="" @click.prevent="showPane">{{ title }}</a>
    <div>
      <strong>Amount:</strong> {{ transaction.amount / 100 | currency }}
    </div>
  </li>
</template>

<script>
export default {
  computed: {
    title() {
      if (this.transaction.merchant) {
        return this.transaction.merchant.name;
      }

      if (this.transaction.counterparty) {
        return this.transaction.counterparty.name;
      }

      return this.transaction.description;
    },
  },
  methods: {
    showPane() {
      this.$store.dispatch('retrieveTransaction', this.transaction.id);
      this.$store.commit('transactionsShowPane', true);
    },
  },
  props: {
    transaction: {
      required: true,
      type: Object,
    },
  },
}
</script>
