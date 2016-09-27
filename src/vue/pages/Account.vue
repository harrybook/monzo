<template>
  <div class="c-account">
    <p v-if="balance.loading">Loading...</p>
    <template v-else>
      <strong>Balance:</strong> {{ balance.data.balance }}<br>
      <strong>Spend today:</strong> {{ balance.data.spend_today }}
    </template>
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
