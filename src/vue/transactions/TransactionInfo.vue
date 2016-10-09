<template>
  <div class="c-transaction-info">
    <transaction-select v-if="!transaction.data.id"></transaction-select>
    <template v-else>
      <transaction-map v-if="transaction.data.merchant" :latitude="transaction.data.merchant.address.latitude" :longitude="transaction.data.merchant.address.longitude" />
      <div class="c-transaction-info__details">
        <div class="c-transaction-info__avatar">
          <transaction-avatar v-if="transaction.data.merchant" :image="transaction.data.merchant.logo" :size="70" />
        </div>
        <h1 class="c-transaction-info__heading">{{ title }}</h1>
        <p v-if="transaction.data.merchant" class="c-transaction-info__address">
          <a :href="'http://maps.google.com/?ll=' + transaction.data.merchant.address.latitude + ',' + transaction.data.merchant.address.longitude" target="_blank">{{ transaction.data.merchant.address.short_formatted }}</a>
        </p>
        <div class="c-transaction-info__amount">{{ transaction.data.amount / 100 | currency(transaction.data.currency) }}</div>
        <div v-if="transaction.data.local_amount !== transaction.data.amount" class="c-transaction-info__amount-local">{{ transaction.data.local_amount / 100 | currency(transaction.data.local_currency) }}</div>
        <hr>
        <div v-if="transaction.data.notes" class="c-transaction-item__notes u-no-wrap">{{ transaction.data.notes }}</div>
        <div v-if="transaction.data.decline_reason" class="c-transaction-item__error u-no-wrap">Declined<template v-if="declinedReason">, {{ declinedReason }}</template></div>
      </div>
    </template>
  </div>
</template>

<script>
import { currency } from '../../js/filters';
import TransactionAvatar from './TransactionAvatar.vue';
import TransactionSelect from './TransactionSelect.vue';
import TransactionMap from './TransactionMap.vue';

export default {
  components: {
    TransactionAvatar,
    TransactionSelect,
    TransactionMap,
  },
  computed: {
    declinedReason() {
      if (!this.transaction.data.decline_reason) {
        return false;
      }

      switch (this.transaction.data.decline_reason) {
        case 'INSUFFICIENT_FUNDS': {
          const { amount, currency: code } = this.transaction.data;
          return `you didn\'t have ${currency(Math.abs(amount / 100, code))}`;
        }

        default: {
          return '';
        }
      }
    },
    transaction() {
      return this.$store.state.transaction;
    },
    title() {
      if (this.transaction.is_load) {
        return this.transaction.data.description;
      }

      if (this.transaction.data.merchant) {
        return `${this.transaction.data.merchant.name} ${this.transaction.data.merchant.emoji}`;
      }

      if (this.transaction.data.counterparty) {
        return this.transaction.data.counterparty.name;
      }

      return this.transaction.data.description;
    },
  },
};
</script>

<style lang="scss">
@import '../../sass/variables';

.c-transaction-info {
  height: 100%;
}

.c-transaction-info__details {
  padding: 0 20px;
}

.c-transaction-info__avatar {
  margin-top: -35px;
}

.c-transaction-info__heading {
  font-weight: 300;
  font-size: 26px;
  margin-bottom: 10px;
  margin-top: 30px;
  line-height: 26px;
}

.c-transaction-info__address {
  font-size: 13px;
}

.c-transaction-info__amount {
  font-size: 32px;
  line-height: 32px;
  font-weight: 300;
  margin-top: 30px;
}

.c-transaction-info__amount-local {
  color: $silver;
  margin-top: 11px;
}
</style>
