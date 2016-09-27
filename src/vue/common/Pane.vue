<template>
  <transition name="pane">
    <div class="c-pane">
      <div class="c-pane__background" @click.prevent="$emit('close')"></div>
      <div class="c-pane__window">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  created() {
    document.body.classList.add('is-disabled');
  },
  destroyed() {
    document.body.classList.remove('is-disabled');
  },
};
</script>

<style lang="scss">
// Used to fake transition on parent element.
.pane-enter,
.pane-leave-active {
  transform: translate3d(0, 0, 0);
}

.c-pane {
  height: 100%;
  left: 0;
  overflow-y: scroll;
  position: fixed;
  top: 0;
  transform: translateZ(0);
  transition: transform .3s ease;
  width: 100%;
  z-index: 9999999;
}

.c-pane__background {
  background: transparentize(#fff, 0.15);
  cursor: pointer;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  transition: opacity .3s ease;
  width: 100%;
  z-index: 999;

  .pane-enter &,
  .pane-leave-active & {
    opacity: 0;
  }
}

.c-pane__window {
  background: #fff;
  box-shadow: 0 5px 30px transparentize(#000, 0.9);
  height: 100%;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: 0;
  transition: transform .3s ease;
  width: 500px;
  z-index: 10000;

  .pane-enter &,
  .pane-leave-active & {
    // 105% to hide shadow nicely too.
    transform: translate3d(105%, 0, 0);
  }
}
</style>
