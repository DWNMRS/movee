<template>
  <div class="slider-wrapper--background">
    <div class="slider__slide" v-for="(slide, index) of movieInfo.images[activeMovieId]" :key="index">
      <div class="slider__slide-img" :class="{ slide: true, active: index === currentSlideIndex }"
        :style="{ backgroundImage: `url(${x})` }" :alt="`кадр из фильма '${activeMovie?.nameRu}'`"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useMovieInfo } from '@/stores/MovieInfoStore'
const movieInfo = useMovieInfo()

let currentSlideIndex = ref(0);
let x = ref<string>('')
const activeMovieId = ref<number>(0)
const activeMovie = computed(() => {
  if (activeMovieId.value === null) {
    return null
  }
  return movieInfo.movies.find((movie) => {
    return movie.kinopoiskId === activeMovieId.value
  })
})

const nextSlide = () => {
  currentSlideIndex.value = (currentSlideIndex.value + 1);
  x.value = movieInfo.images[activeMovieId.value][currentSlideIndex.value];
};
</script>

<style scoped lang="scss">
.slider-wrapper--background {
  overflow: hidden;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  transition: opacity 0.5s ease-in-out;

  .slider {
    width: 100%;
    height: 100%;


    &__slide {
      flex: 0 0 100%;
      opacity: 0;
      position: absolute;
      transition: opacity 0.5s ease-in-out;

      &-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

}
</style>