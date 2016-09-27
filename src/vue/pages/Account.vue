<template>
  <div class="c-account">
    <div class="c-account-header">
      <p v-if="balance.loading">Loading...</p>
      <template v-else>
        <strong>Balance:</strong> {{ balance.data.balance / 100 | currency }}<br>
        <strong>Spend today:</strong> {{ balance.data.spend_today / 100 | currency }}
      </template>
    </div>
    <div class="grid">
      <div class="grid__item one-half c-transaction-view">
        <router-view></router-view>
      </div><!--
   --><div class="grid__item one-half">
        <p v-if="!transaction.data">Select transaction</p>
        <template v-else>
          <p v-if="transaction.loading">Loading...</p>
          <template v-else>
            <h1>{{ title }}</h1>
            <ul>
              <li>{{ transaction.data.merchant ? transaction.data.merchant.emoji : '' }}</li>
              <li><strong>Amount:</strong> {{ transaction.data.amount / 100 | currency }}</li>
            </ul>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    balance() {
      return this.$store.state.balance;
    },
    transaction() {
      return this.$store.state.transaction;
    },
    title() {
      if (this.transaction.is_load) {
        return this.transaction.data.description;
      }

      if (this.transaction.data.merchant) {
        return this.transaction.data.merchant.name;
      }

      if (this.transaction.data.counterparty) {
        return this.transaction.data.counterparty.name;
      }

      return this.transaction.data.description;
    },
  },
  created() {
    this.$store.dispatch('retrieveBalance', this.$route.params.id);
  },
}
</script>

<style lang="scss">
.c-account-header {
  background: #14233c;
  color: #fff;
  padding: 20px;
  width: 100%;
}

.c-transaction-view {
  border-right: 1px solid #efefef;
}
</style>
