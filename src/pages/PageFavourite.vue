<template>
  <TheContainer :titlePage="titlePage">
    <MovieFavourite />
  </TheContainer>
</template>

<script setup lang='ts'>
import MovieFavourite from '@/components/MovieFavourite.vue'
import TheContainer from '@/components/TheContainer.vue'

const titlePage = 'Мои фильмы'
</script>