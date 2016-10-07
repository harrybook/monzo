<template>
  <div class="c-accounts">
    <h1>Accounts</h1>
    <loader v-if="accounts.loading" />
    <account-list v-else />
  </div>
</template>

<script>
import AccountList from '../accounts/AccountList.vue';
import Loader from '../common/Loader.vue';

export default {
  components: {
    AccountList,
    Loader,
  },
  computed: {
    accounts() {
      return this.$store.state.accounts;
    },
  },
  created() {
    this.$store.dispatch('retrieveAccounts');
  },
};
</script>
