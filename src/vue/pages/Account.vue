<template>
  <div class="c-account">
      <div class="c-transaction-list-container">
        <div class="c-account-header">
          <p v-if="balance.loading">Loading...</p>
          <template v-else>
            <div class="grid">
              <div class="grid__item one-half c-account-header__amount">
                <currency :value="balance.data.balance / 100" split :currency="balance.data.currency"></currency>
                <div class="c-account-header__tag">Card balance</div>
              </div><!--
           --><div class="grid__item one-half u-text-align-right c-account-header__amount">
                <currency :value="balance.data.spend_today / 100" split :currency="balance.data.currency"></currency>
                <div class="c-account-header__tag">Spent today</div>
              </div>
            </div>
          </template>
        </div>
        <div class="c-another-container">
          <router-view></router-view>
        </div>
      </div><!--
   --><div class="c-transaction-view">
        <p v-if="transaction.loading">Loading...</p>
        <template v-else>
          <p v-if="!transaction.data.id">Select transaction</p>
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
</template>

<script>
import Currency from '../common/Currency.vue';

export default {
  components: {
    Currency,
  },
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
  position: absolute;
  top: 0;
  left: 0;
  height: 100px;
}

.c-transaction-view {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  border-left: 1px solid #ededed;
  height: 100%;
}

.c-another-container {
  position: absolute;
  top: 100px;
  left: 0;
  width: 100%;
  bottom: 0;
  overflow-y: auto;
}

.c-transaction-list-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
}

.c-account-header__amount {
  font-size: 34px;
  line-height: 34px;
  font-weight: 300;
}

.c-account-header__tag {
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
  text-transform: uppercase;
  line-height: 13px;
  margin-top: 7px;
}
</style>
