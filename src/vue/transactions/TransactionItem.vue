<template>
  <div @click.prevent="showPane" class="c-transaction-item" :class="{ 'c-transaction-item--top-up': transaction.is_load }">
    <div class="c-transaction-item__image">
      <div class="c-transaction-item__image-container" :style="imageStyle"></div>
    </div>
    <div class="c-transaction-item__info">
      <div class="c-transaction-item__title">{{ title }}</div>
      <div v-if="transaction.notes" class="c-transaction-item__notes">{{ transaction.notes }}</div>
    </div>
    <div class="c-transaction-item__amount">
      <div class="c-transaction-item__amount-container">
        <small v-if="transaction.is_load">+</small>{{ amount[0] }}.<small>{{ amount[1] }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import { currency } from '../../js/filters';

export default {
  computed: {
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

<style lang="scss">
.c-transaction-item {
  cursor: pointer;
  padding: 15px 20px;
  border-bottom: 1px solid #efefef;
  display: flex;
  background: #fff;

  &:hover {
    background: #f9f9f9;
  }

  &:active {
    background: #f5f5f5;
  }
}

.c-transaction-item__image {
  line-height: 0;
  padding: 5px 0;
}

.c-transaction-item__image-container {
  display: inline-block;
  background-color: #ddd;
  width: 35px;
  height: 35px;
  border-radius: 8px;
  background-position: center;
  background-size: cover;

  .c-transaction-item--top-up & {
    background-color: #43af7a;
  }
}

.c-transaction-item__info {
  flex-grow: 1;
  padding: 0 20px;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.c-transaction-item__notes {
  color: #bbb;
  font-size: 13px;
}

.c-transaction-item__amount {
  font-weight: 300;
  font-size: 26px;
  justify-content: center;
  display: flex;
  flex-direction: column;

  small {
    font-size: 16px;
  }

  .c-transaction-item--top-up & {
    color: #43af7a;
  }
}

.c-transaction-item__amount-container {
  display: inline;
}
</style>
