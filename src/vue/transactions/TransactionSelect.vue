<template>
  <div class="c-transaction-select">
    <p>No transaction selected</p>
  </div>
</template>

<style lang="scss">
.c-transaction-select {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  text-align: center;

  p {
    color: #bbb;
    cursor: default;
    font-size: 26px;
    font-weight: 300;
    margin: 0;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
  }
}
</style>
