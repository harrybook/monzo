<template>
  <div class="c-transaction-info">
    <transaction-select v-if="!transaction.data.id"></transaction-select>
    <div v-else class="c-transaction-info__details">
      <transaction-map v-if="transaction.data.merchant" :latitude="transaction.data.merchant.address.latitude" :longitude="transaction.data.merchant.address.longitude" />
      <div class="c-transaction-info__avatar">
        <transaction-avatar v-if="transaction.data.merchant" :image="transaction.data.merchant.logo" :size="70" />
      </div>
      <h1 class="c-transaction-info__heading">{{ title }}</h1>
      <p v-if="transaction.data.merchant" class="c-transaction-info__address">
        <a :href="'http://maps.google.com/?ll=' + transaction.data.merchant.address.latitude + ',' + transaction.data.merchant.address.longitude" target="_blank">{{ transaction.data.merchant.address.short_formatted }}</a>
      </p>
      <div class="c-transaction-info__amount">{{ transaction.data.amount / 100 | currency(transaction.data.currency) }}</div>
    </div>
  </div>
</template>

<script>
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
};
</script>

<style lang="scss">
@import '../../sass/variables';

.c-transaction-info {
  height: 100%;
}

.c-transaction-info__avatar {
  margin-top: -25px;
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
  font-size: 38px;
  line-height: 38px;
  font-weight: 300;
  margin-top: 30px;
}
</style>
