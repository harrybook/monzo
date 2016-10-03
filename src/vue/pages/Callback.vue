<template>
  <div class="c-callback">
    <!-- Nothing to see here... -->
  </div>
</template>

<script>
export default {
  mounted() {
    const code = this.$route.query.code;
    if (!code) {
      return console.error('Code not provided.');
    }

    this.$http.get(`/token?code=${code}`)
      .then(response => {
        localStorage.setItem('accessToken', response.body.access_token);
        localStorage.setItem('refreshToken', response.body.refresh_token);
        this.$router.push('/accounts');
      })
      .catch(error => {
        console.error(error);
      });
  },
}
</script>
