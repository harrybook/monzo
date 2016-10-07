<template>
  <div class="c-callback"></div>
</template>

<script>
export default {
  created() {
    const code = this.$route.query.code;
    if (!code) {
      // TODO Do something.
      return null;
    }

    return this.$http.get(`/token?code=${code}`)
      .then((response) => {
        localStorage.setItem('accessToken', response.body.access_token);
        localStorage.setItem('refreshToken', response.body.refresh_token);
        this.$router.push('/accounts');
      })
      .catch(() => {
        // TODO Do something.
      });
  },
};
</script>
