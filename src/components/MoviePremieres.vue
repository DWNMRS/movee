<template>
  <div class="movie-premieres">
    <h1 class="h1">Премьеры</h1>
    <div class="slider-wrapper--background">
      <div class="slider__slide"  v-for="(slide, index) of curentImages" :key="index"
        :class="{ active: index === currentSlideIndex }">
        <img width="1920" height="1080" :src="slide" :alt="`кадр из фильма '${activeMovie?.nameRu}'`" loading="lazy" @load="handleImageLoad()">
      </div>
    </div>

    <div class="movie-premieres__movie-info">
      <Transition mode="out-in">
        <MovieCard v-if="activeMovie" :movie="activeMovie" :key="activeMovieId" is-special />
      </Transition>
    </div>

    <div class="slider-wrapper--side">
      <Swiper class="slider" v-if="isSwiperInitialized" @active-index-change="getInformation" :modules="modules"
        :direction="'vertical'" :slides-per-group="1" :slides-per-view="3.5" :pagination="swiperModulesOptions.pagination"
        :mousewheel="swiperModulesOptions.mousewheel" :space-between="40" :watch-overflow="false" :auto-height="true"
        :centered-slides="true" :loop="true" :slide-to-clicked-slide="true" :speed="1000">
        <SwiperSlide class="slider__slide" v-for="premiere of premiereStore.movies" :key="premiere.kinopoiskId">
          <img class="slider__slide-img" :src="premiere.posterUrlPreview"
            :alt="`постер из фильма '${activeMovie?.nameRu}'`">
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { usePremiereStore } from '@/stores/PremiereStore';
import { useMovieInfo } from '@/stores/MovieInfoStore'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Mousewheel, Pagination } from 'swiper/modules'
import { IMovie } from "@/interfaces/movies"
import MovieCard from './MovieСard.vue';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/mousewheel';
import 'swiper/scss/autoplay';

onMounted(() => {
  if (premiereStore.movies.length === 0) {
    premiereStore.getPremieres().then(() => {
      initializeSwiper();
    });
  } else {
    initializeSwiper();
  }
  startAutoPlay()
})

const premiereStore = usePremiereStore()
const movieInfo = useMovieInfo()
const isSwiperInitialized = ref(false);
const initializeSwiper = () => {
  isSwiperInitialized.value = true;
};
const modules = [Autoplay, Mousewheel, Pagination]

const swiperModulesOptions = {
  autoplay: {
    delay: 20000,
    disableOnInteraction: false,
  },
  mousewheel: {
    invert: false,
  },
  pagination: {
    clickable: true,
  }
}
const currentSlideIndex = ref<number>(0);
const activeMovieId = ref<number>(0)
const imageLoaded = ref<boolean>(false);


const handleImageLoad = () => {
  console.log(123);
  
};
const activeMovie = computed(() => {
  if (activeMovieId.value === null) {
    return null
  }
  return movieInfo.movies.find((movie) => {
    return movie.kinopoiskId === activeMovieId.value
  })
})

const curentImages = computed(() => {
  const currentImagesLinks = movieInfo.images[activeMovieId.value]
  if(!currentImagesLinks) {
    return []
  }
  return (currentImagesLinks.slice(0,currentSlideIndex.value+2));
   
})


const startAutoPlay = () => {
  setInterval(() => {
    nextSlide();
  },7000);
};

const nextSlide = () => {
  currentSlideIndex.value = (currentSlideIndex.value + 1) % movieInfo.images[activeMovieId.value].length;
};




function getInformation(swiperInstance: any) {
  activeMovieId.value = premiereStore.movies[swiperInstance.realIndex].kinopoiskId
  if (!movieInfo.movies.map(movie => movie.kinopoiskId).includes(activeMovieId.value)) {
    movieInfo.getMovieInfo(activeMovieId.value)
    movieInfo.getMovieImages(activeMovieId.value)
  }
  currentSlideIndex.value = 0
}


</script>

<style scoped lang="scss">
.movie-premieres {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 100px 320px 100px 100px;

  .h1 {
    z-index: 2;
  }

  &__movie-info {
    width: 100%;
    position: relative;
    z-index: 2;


  }
}

.slider-wrapper--background {
  overflow: hidden;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;

  .slider__slide {
    background-position: center;
    background-size: cover;
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



.slider-wrapper--side {
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0px;
  width: 220px;
  height: 100vh;
  padding-right: 18px;

  .slider {
    height: inherit;

    &__slide {
      width: 158px;

      &-img {
        width: 158px;
        height: 227px;
      }
    }
  }

  & .swiper-pagination {
    right: 20px;
  }
}
</style>