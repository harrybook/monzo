<template>
  <div class="c-transaction-header">
    <loader v-if="balance.loading" />
    <div v-else class="grid">
      <div class="c-transaction-header__amount grid__item one-half">
        {{ balance.data.balance / 100 | currency(balance.data.currency) }}
        <div class="c-transaction-header__tag">Card balance</div>
      </div><!--
   --><div class="c-transaction-header__amount grid__item one-half u-text-align-right">
        {{ Math.abs(balance.data.spend_today / 100) | currency(balance.data.currency) }}
        <div class="c-transaction-header__tag">Spent today</div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../common/Loader.vue';

export default {
  components: {
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
  height: 100px;
  left: 0;
  padding: 20px;
  position: absolute;
  top: 0;
  width: 100%;
}

.c-transaction-header__amount {
  font-size: 32px;
  font-weight: 300;
  line-height: 32px;
}

.c-transaction-header__tag {
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
  line-height: 13px;
  margin-top: 13px;
  text-transform: uppercase;
}
</style>
