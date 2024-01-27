<template>
  <TheContainer>
    <MovieDetail :movie ="props.id" />
  </TheContainer>
</template>

<script setup lang='ts'>
import MovieDetail from '@/components/MovieDetail.vue'
import TheContainer from '@/components/TheContainer.vue'


const props = defineProps({
  id: {
    type: String,
    required: true,
    default: () => { }
  },
})

</script>