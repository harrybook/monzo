<template>
  <div @click.prevent="showTransaction" class="c-transaction-item" :class="classes">
    <div class="c-transaction-item__image">
      <div class="c-transaction-item__image-container" :style="imageStyle">
        <span v-if="transaction.is_load">+</span>
      </div>
    </div>
    <div class="c-transaction-item__info">
      <div class="c-transaction-item__title u-no-wrap">{{ title }}</div>
      <div v-if="transaction.notes" class="c-transaction-item__notes u-no-wrap">{{ transaction.notes }}</div>
      <div v-else v-if="transaction.decline_reason" class="c-transaction-item__error u-no-wrap">
        Declined<template v-if="declinedReason">, {{ declinedReason }}</template>
      </div>
    </div>
    <div class="c-transaction-item__amount">
      <div class="c-transaction-item__amount-container">
        <div class="c-transaction-item__amount-main">
          <currency :value="transaction.amount / 100" split sign></currency>
        </div>
        <div v-if="transaction.local_amount !== transaction.amount" class="c-transaction-item__amount-local">
          <currency :value="transaction.local_amount / 100" :currency="transaction.local_currency"></currency>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { currency } from '../../js/filters';
import currencies from '../../js/currencies';
import Currency from '../common/Currency.vue';

export default {
  components: {
    Currency,
  },
  computed: {
    classes() {
      return {
        'c-transaction-item--top-up': this.transaction.is_load,
        'c-transaction-item--selected': this.currentTransaction.id === this.transaction.id,
      };
    },
    amount() {
      const amount = currency(this.transaction.amount / 100);
      return (amount + '').split('.');
    },
    imageStyle() {
      if (!this.transaction.merchant) {
        return {};
      }

      return {
        backgroundImage: `url(${this.transaction.merchant.logo})`,
      };
    },
    declinedReason() {
      if (!this.transaction.decline_reason) {
        return false;
      }

      switch (this.transaction.decline_reason) {
        case 'INSUFFICIENT_FUNDS':
          const symbol = currencies[this.transaction.currency] ? currencies[this.transaction.currency].symbol : '';
          return `you didn\'t have ${symbol}${currency(Math.abs(this.transaction.amount / 100))}`;
        default:
          return '';
      }
    },
    title() {
      if (this.transaction.is_load) {
        return this.transaction.description;
      }

      if (this.transaction.merchant) {
        return this.transaction.merchant.name;
      }

      if (this.transaction.counterparty) {
        return this.transaction.counterparty.name;
      }

      return this.transaction.description;
    },
    currentTransaction() {
      return this.$store.state.transaction.data;
    },
  },
  methods: {
    showTransaction() {
      this.$store.dispatch('retrieveTransaction', this.transaction.id);
      // this.$store.commit('transactionsShowPane', true);
    },
  },
  props: {
    transaction: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style lang="scss">
@import '../../sass/variables';

.c-transaction-item {
  cursor: pointer;
  padding: 10px 20px;
  border-bottom: 1px solid $gallery;
  display: flex;
  background: $white;

  &:hover {
    background: $alabaster;
  }

  &:active {
    background: darken($alabaster, 1);
  }
}

.c-transaction-item--selected {
  background: $alabaster;
}

.c-transaction-item__image {
  line-height: 0;
  padding: 10px 0;
}

.c-transaction-item__image-container {
  padding-top: 16px;
  text-align: center;
  color: $white;
  font-size: 20px;
  display: inline-block;
  background-color: $gallery;
  width: 35px;
  height: 35px;
  border-radius: 8px;
  background-position: center;
  background-size: cover;

  .c-transaction-item--top-up & {
    background-color: $ocean-green;
  }
}

.c-transaction-item__info {
  flex-grow: 1;
  padding: 0 20px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.c-transaction-item__notes {
  color: $silver;
  font-size: 13px;
}

.c-transaction-item__error {
  color: $guardsman-red;
  font-size: 13px;
}

.c-transaction-item__amount {
  justify-content: center;
  display: flex;
  flex-direction: column;
  text-align: right;
}

.c-transaction-item__amount-main {
  font-weight: 300;
  font-size: 26px;
  line-height: 26px;

  .c-transaction-item--top-up & {
    color: $ocean-green;
  }
}

.c-transaction-item__amount-local {
  color: $silver;
  font-size: 13px;
  line-height: 13px;
  margin-top: 6px;
}

.c-transaction-item__amount-container {
  display: inline;
}
</style>
