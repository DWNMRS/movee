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
  padding: 80px;
  padding-left: 280px;


  @include break-xxl {
    padding: 56px;
    padding-left: 256px;
  }

  @include break-xl {
    padding: 48px;
    padding-top: 128px;
  }

  @include break-lg {
    padding: 40px;
    padding-top: 120px;
  }

  @include break-md {
    padding: 32px;
    padding-top: 112px;
  }

  @include break-sm {
    padding: 16px;
    padding-top: 76px;
  }
}
</style>