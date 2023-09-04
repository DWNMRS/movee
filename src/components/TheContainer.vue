<template>
  <div class="container">
    <h1 class="h1">{{ props.titlePage }}</h1>
    <div class="container__page">
      <slot />
    </div>

  </div>
</template>

<script setup lang='ts'>

const props = defineProps({
  titlePage: {
    type: String,
    required: true,
    default: 'Page'
  }

})
</script>

<style scoped lang='scss'>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: calc(100% - 190px);
  margin-left: 190px;
  padding: 100px;

  &__page {
    height: 100%;
    display: flex;
    align-items: center;
  }

  @include break-xl {
    width: 100%;
    margin-left: 0;
    margin-top: 80px;
    height: calc(100vh - 80px);
    padding: 40px;
  }

  .h1 {
    z-index: 2;
    width: fit-content;
  }
}
</style>