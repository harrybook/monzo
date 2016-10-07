<template>
  <div class="c-loader">
    <div class="container">
      <div class="c-loader__circles">
        <div v-for="index in 12" class="c-loader__circle" :class="'c-loader__circle--' + (index + 1)"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../sass/variables';

$circles: 12;
$duration: 1s;

.c-loader {
  padding: 0 20px;
  text-align: center;
  height: 100%;
  display: table;
  width: 100%;

  .container {
    // TODO use flexbox
    display: table-cell;
    vertical-align: middle;
  }
}

.c-loader__circles {
  display: inline-block;
  height: 40px;
  position: relative;
  width: 40px;
}

.c-loader__circle {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.c-loader__circle:before {
  animation: spinner $duration infinite ease-in-out both;
  background-color: darken($gallery, 50);
  border-radius: 100%;
  content: '';
  display: block;
  height: 15%;
  margin: 0 auto;
  width: 15%;
}

@for $i from 2 through $circles {
  .c-loader__circle--#{$i} {
    transform: rotate(360deg / $circles * ($i - 1));
  }
}

@for $i from 2 through $circles {
  .c-loader__circle--#{$i}:before {
    animation-delay: - $duration + $duration / $circles * ($i - 1);
  }
}

@keyframes spinner {
  0%, 39%, 100% {
    opacity: 0;
  }

  40% {
    opacity: 1;
  }
}
</style>
