<template>
  <div class="c-login">
    <h1>Login</h1>
    <a :href="'https://auth.getmondo.co.uk/?client_id=' + config.monzo.id + '&redirect_uri=' + config.monzo.redirectUri + '&response_type=code'">Login with Monzo</a>
  </div>
</template>

<script>
import config from '../../../config';

export default {
  data() {
    return {
      config,
    };
  },
};
</script>
