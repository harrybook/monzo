<template>
  <div class="c-transaction-header">
    <loader v-if="balance.loading"></loader>
    <div v-else class="grid">
      <div class="c-transaction-header__amount grid__item one-half">
        <currency :value="balance.data.balance / 100" split :currency="balance.data.currency"></currency>
        <div class="c-transaction-header__tag">Card balance</div>
      </div><!--
   --><div class="c-transaction-header__amount grid__item one-half u-text-align-right">
        <currency :value="balance.data.spend_today / 100" split :currency="balance.data.currency"></currency>
        <div class="c-transaction-header__tag">Spent today</div>
      </div>
    </div>
  </div>
</template>

<script>
import Currency from '../common/Currency.vue';
import Loader from '../common/Loader.vue';

export default {
  components: {
    Currency,
    Loader,
  },
  computed: {
    balance() {
      return this.$store.state.balance;
    },
  },
  created() {
    this.$store.dispatch('retrieveBalance', this.$route.params.id);
  },
};
</script>

<style lang="scss">
@import '../../sass/variables';

.c-transaction-header {
  background: $big-stone;
  color: $white;
  height: 105px;
  left: 0;
  padding: 20px;
  position: absolute;
  top: 0;
  width: 100%;
}
.c-transaction-header__amount {
  font-size: 38px;
  font-weight: 300;
  line-height: 38px;
}

.c-transaction-header__tag {
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
  line-height: 13px;
  margin-top: 6px;
  text-transform: uppercase;
}
</style>
