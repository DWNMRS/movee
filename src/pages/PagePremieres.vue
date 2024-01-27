<template>
  <TheContainer>
    <h1 class="h1">Премьеры</h1>
    <MoviePremieres />
  </TheContainer>
</template>

<script setup lang='ts'>
import TheContainer from '@/components/TheContainer.vue'
import MoviePremieres from '@/components/MoviePremieres.vue'


</script>

<style scoped lang="scss">
.container {
  color: $white;
  padding-right: 264px;

  @include break-xxl {
    padding-right: 256px;
  }

  @include break-xl {
    padding-right: 40px;
    padding-bottom: 240px;
  }

  @include break-md {
    padding-right: 16px;
    padding-bottom: 192px;
  }

  .h1 {
    z-index: 1;
  }
}
</style>