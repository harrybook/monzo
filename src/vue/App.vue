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
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 16px;
  line-height: 1.6;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  margin: 0;
  padding: 0;
}

a {
  color: $picton-blue;
  text-decoration: none;
}

p {
  margin: 0 0 20px;
}

hr {
  border-width: 1px 0 0;
  border: solid $gallery;
  height: 1px;
  margin: 30px 0;
  width: 100%;
}
</style>
