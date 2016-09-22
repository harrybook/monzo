<template>
  <div class="c-account-list">
    <ul>
      <li v-for="account in accounts.items">
        <router-link :to="'/account/' + account.id">{{ account.description }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    accounts() {
      return this.$store.state.accounts;
    },
  },
}
</script>
