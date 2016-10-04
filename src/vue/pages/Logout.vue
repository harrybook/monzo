<template>
  <div class="c-logout"></div>
</template>

<script>
export default {
  mounted() {
    localStorage.clear();
    this.$router.push('/');
  },
};
</script>
