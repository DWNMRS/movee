<template>
  <TheContainer :titlePage="titlePage">
    <MoviePremieres />
  </TheContainer>
</template>

<script setup lang='ts'>
import TheContainer from '@/components/TheContainer.vue'
import MoviePremieres from '@/components/MoviePremieres.vue'

const titlePage = 'Премьеры'

</script>