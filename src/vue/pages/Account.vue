<template>
  <div class="c-account">
    <div class="c-account-header">
      <p v-if="balance.loading">Loading...</p>
      <template v-else>
        <strong>Balance:</strong> {{ balance.data.balance / 100 | currency }}<br>
        <strong>Spend today:</strong> {{ balance.data.spend_today / 100 | currency }}
      </template>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    balance() {
      return this.$store.state.balance;
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
</style>
