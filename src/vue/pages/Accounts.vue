<template>
  <div class="c-accounts">
    <h1>Accounts</h1>
    <p v-if="accounts.loading">Loading...</p>
    <account-list v-else></account-list>
  </div>
</template>

<script>
import AccountList from '../accounts/AccountList.vue';
export default {
  components: {
    AccountList,
  },
  computed: {
    accounts() {
      return this.$store.state.accounts;
    },
  },
  created() {
    this.$store.dispatch('retrieveAccounts');
  },
}
</script>
