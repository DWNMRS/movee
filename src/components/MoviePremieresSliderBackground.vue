<template>
  <div v-if="imagePaths" class="slider slider--background">
    <div class="slider__slide" v-for="(path, index) of curentImages" :key="index"
      :class="{ active: index === currentSlideIndex }">
      <img width="1920" height="1080" :src="path" :alt="`кадр из фильма '${movieName}'`">
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from 'vue';

const props = defineProps({
  imagePaths: {
    type: Array as () => string[],
    default: [],
    required: false
  },
  movieName: {
    type: String,
    default: '',
    required: false,
  }
})

let intervalId: ReturnType<typeof setInterval>;

onMounted(() => {
  startAutoPlay()
})
onBeforeUnmount(() => {
  stopAutoPlay();
});

const startAutoPlay = () => {
  intervalId = setInterval(() => {
    console.log(123)
    nextSlide();
  }, 4000);
};

const stopAutoPlay = () => {
  clearInterval(intervalId);
};


const currentSlideIndex = ref<number>(0);

const curentImages = computed(() => {
  const currentImagesLinks = props.imagePaths
  if (currentImagesLinks.length === 0) {
    currentSlideIndex.value = 0
    return []
  }
  return (currentImagesLinks.slice(0, currentSlideIndex.value + 2));
})

const nextSlide = () => {
  if (curentImages.value.length === 0) {
    currentSlideIndex.value = 0
  }
  currentSlideIndex.value = (currentSlideIndex.value + 1) % props.imagePaths.length;
};

</script>

<style scoped lang="scss">
.slider {
  &--background {
    overflow: hidden;
    position: absolute;
    z-index: 0;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;

    @include break-md {
      display: none;
    }

    .slider__slide {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 2.0s;

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }

      &.active {
        opacity: 1;
      }
    }
  }
}
</style>