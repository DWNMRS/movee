<template>
  <TheContainer :titlePage="titlePage">
    <MovieSearch/>
  </TheContainer>
</template>

<script setup lang='ts'>
import TheContainer from '@/components/TheContainer.vue'
import MovieSearch from '@/components/MovieSearch.vue';

const titlePage:string = 'Поиск'
</script>