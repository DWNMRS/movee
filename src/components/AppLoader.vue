<template>
  <div class="loader">
    <div class="loader__item"></div>
    <div class="loader__item"></div>
    <div class="loader__item"></div>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  display: block;
  margin: auto;
  position: relative;
  width: 80px;
  height: 80px;

  &__item {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: #26D2A9;
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;

    &:nth-child(1) {
      left: 8px;
      animation-delay: -0.24s;
    }

    &:nth-child(2) {
      left: 32px;
      animation-delay: -0.12s;
    }

    &:nth-child(3) {
      left: 56px;
      animation-delay: 0;
    }
  }
}

@keyframes loader {
  0% {
    top: 8px;
    height: 64px;
  }

  50%,
  100% {
    top: 24px;
    height: 32px;
  }
}
</style>