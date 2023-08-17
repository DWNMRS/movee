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
  width: calc(100% - 230px);
  display: flex;
  margin-left: 230px;
}
</style>