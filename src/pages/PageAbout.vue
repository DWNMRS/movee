<template>
  <TheContainer :titlePage="titlePage">
    <MovieAbout />
  </TheContainer>
</template>

<script setup lang='ts'>
import MovieAbout from '@/components/MovieAbout.vue'
import TheContainer from '@/components/TheContainer.vue'

const titlePage:string = 'О приложении'
</script>