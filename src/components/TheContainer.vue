<template>
  <div class="container">
    <slot />
  </div>
</template>

<script setup lang='ts'>
</script>

<style scoped lang='scss'>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 64px;
  padding-left: 264px;

  @include break-xl {
    padding: 32px;
    padding-top: 112px;
  }

  @include break-md {
    padding: 16px;
    padding-top: 76px;
  }
}
</style>