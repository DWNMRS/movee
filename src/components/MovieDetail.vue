<template>
  <div class="movie-detail">
    <h1 class="h1">{{ props.movie }}</h1>
  </div>
</template>

<script setup lang="ts"> 

const props = defineProps({

movie: {
  type: String,
  required: true,
  default: () => { }
},
})
</script>