<template>
  <TheContainer>
    <MovieFavourite />
  </TheContainer>
</template>

<script setup lang='ts'>
import MovieFavourite from '@/components/MovieFavourite.vue'
import TheContainer from '@/components/TheContainer.vue'

</script>

<style lang="scss" scoped>

.container {
  min-height: 100%;
  height: auto;
}

</style>