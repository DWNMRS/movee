<template>
  <TheContainer :titlePage="titlePage">
    <MoviePremieres />
  </TheContainer>
</template>

<script setup lang='ts'>
import TheContainer from '@/components/TheContainer.vue'
import MoviePremieres from '@/components/MoviePremieres.vue'

const titlePage: string = 'Премьеры'

</script>

<style scoped lang="scss">
.container {
  padding-right: 264px;

  @include break-xxl {
    padding-right: 256px;
  }

  @include break-xl {
    padding-right: 228px;
  }

  @include break-lg {
    padding-right: 40px;
    padding-bottom: 240px;
  }

  @include break-md {
    padding-right: 32px;
    padding-bottom: 224px;
  }

  @include break-sm {
    padding-right: 16px;
  }
}
</style>