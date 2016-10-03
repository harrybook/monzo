<template>
  <span class="c-currency" :class="{ 'c-currency--split': split }">
    <small v-if="currency">{{ symbol }}</small>{{ amount[0] }}.<small>{{ amount[1] }}</small>
  </span>
</template>

<script>
import { currency } from '../../js/filters';
import currencies from '../../js/currencies';

export default {
  computed: {
    symbol() {
      return currencies[this.currency] ? currencies[this.currency].symbol : '';
    },
    amount() {
      let amount = '';
      if (this.sign) {
        amount += this.value > 0 ? '+' : '-';
      }

      amount += currency(Math.abs(this.value));
      return (amount + '').split('.');
    },
  },
  props: {
    currency: String,
    sign: {
      default: false,
      type: Boolean,
    },
    split: Boolean,
    value: {
      required: true,
      type: Number,
    },
  },
};
</script>

<style lang="scss">
.c-currency small {
  font-size: 1em;
}

.c-currency--split small {
  font-size: 0.6em;
}
</style>
