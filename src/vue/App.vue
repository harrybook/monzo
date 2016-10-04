<template>
  <div class="c-app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import '../sass/variables';
@import '../sass/grid';
@import '../sass/utilities';

html {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 16px;
  line-height: 1.6;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  padding: 0;
  margin: 0;
}

a {
  color: $picton-blue;
  text-decoration: none;
}

p {
  margin: 0 0 20px;
}
</style>
