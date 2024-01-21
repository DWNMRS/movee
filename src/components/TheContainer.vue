<template>
  <div class="container">
    <h1 class="h1">{{ props.titlePage }}</h1>
    <slot />
  </div>
</template>

<script setup lang='ts'>

const props = defineProps({
  titlePage: {
    type: String,
    required: true,
    default: ''
  }
})
</script>

<style scoped lang='scss'>
.container {
  position: relative;
  overflow: hidden;
  width: 100%;
  margin-left: 200px;
  padding: 80px;
  display: flex;
  flex-direction: column;

  @include break-xxl {
    padding: 56px;
  }

  @include break-xl {
    margin-left: 0;
    margin-top: 80px;
    padding: 48px;
  }

  @include break-lg {
    padding: 40px;
  }

  @include break-md {
    padding: 32px;
  }

  @include break-sm {
    margin-top: 60px;
    padding: 16px;

  }

  .h1 {
    z-index: 2;
    width: fit-content;
  }
}
</style>