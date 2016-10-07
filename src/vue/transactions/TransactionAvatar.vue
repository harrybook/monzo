<template>
  <div class="c-transaction-avatar" :style="style">
    <template v-if="text">{{ text }}</template>
  </div>
</template>

<script>
export default {
  computed: {
    style() {
      return {
        backgroundImage: this.image ? `url('${this.image}')` : null,
        height: `${this.size}px`,
        width: `${this.size}px`,
      };
    },
  },
  props: {
    image: String,
    size: {
      default: 35,
    },
    text: String,
  },
};
</script>

<style lang="scss">
@import '../../sass/variables';

.c-transaction-avatar {
  background-color: $gallery;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
  color: $white;
  display: inline-block;
  font-size: 20px;
  padding-top: 16px;
  position: relative;
  text-align: center;
}
</style>
