<template>
  <div class="movie-premieres">
    <h1 class="h1">Премьеры</h1>
    <MoviePremieresSliderBackground :imagePaths="movieInfo.images[activeMovieId]" :movieName="activeMovie?.nameRu" />

    <Transition mode="out-in">
      <MovieCard v-if="activeMovie" :movie="activeMovie" :key="activeMovieId" is-special />
    </Transition>

    <div class="slider-wrapper--side">
      <Swiper v-if="isSwiperInitialized" @active-index-change="getInformation"
        :slide-to-clicked-slide="swiperOptions.slideToClickedSlide" :centered-slides="swiperOptions.centeredSlides"
        :slides-per-view="swiperOptions.slidesPerView" :watch-overflow="swiperOptions.watchOverflow"
        :space-between="swiperOptions.spaceBetween" :breakpoints="swiperOptions.breakpoints"
        :auto-height="swiperOptions.autoHeight" :pagination="swiperOptions.pagination"
        :mousewheel="swiperOptions.mousewheel" :direction="swiperOptions.direction" :autoplay="swiperOptions.autoplay"
        :speed="swiperOptions.speed" :loop="swiperOptions.loop" :modules="modules">

        <SwiperSlide v-for="premiere of premiereStore.movies" :key="premiere.kinopoiskId">
          <img class="swiper-slide__img" :src="premiere.posterUrlPreview"
            :alt="`постер из фильма '${activeMovie?.nameRu}'`">
        </SwiperSlide>

      </Swiper>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

import { usePremiereStore } from '@/stores/PremiereStore'
import { useMovieInfo } from '@/stores/MovieInfoStore'
const premiereStore = usePremiereStore()
const movieInfo = useMovieInfo()

import MovieCard from './MovieСard.vue';
import MoviePremieresSliderBackground from './MoviePremieresSliderBackground.vue'

import SwiperInstance from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Mousewheel, Pagination, Controller } from 'swiper/modules'
import { SwiperOptions } from 'swiper/types';
const modules = [Autoplay, Mousewheel, Pagination, Controller]

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/mousewheel';
import 'swiper/scss/autoplay';
import 'swiper/scss/effect-fade'

onMounted(() => {
  if (premiereStore.movies.length === 0) {
    premiereStore.getPremieres().then(() => {
      initializeSwiper();
    });
  } else {
    initializeSwiper();
  }
})

const isSwiperInitialized = ref<boolean>(false);
const initializeSwiper = () => {
  isSwiperInitialized.value = true;
};



const swiperOptions: SwiperOptions = {
  loop: true,
  speed: 500,
  autoplay: {
    delay: 1000000,
    disableOnInteraction: false,
  },
  mousewheel: {
    invert: false,
  },
  centeredSlides: true,
  watchOverflow: true,
  slideToClickedSlide: true,
  direction: "vertical",
  slidesPerView: "auto",
  slidesPerGroup: 1,
  spaceBetween: 40,
  autoHeight: false,
  pagination: {
    enabled: false,
    clickable: false,
  },

  breakpoints: {
    320: {
      direction: "horizontal",
      slidesPerView: "auto",
      pagination: {
        enabled: false,
        clickable: false,
      },
    },
    1024: {
      direction: "vertical",
      spaceBetween: 30,
      slideToClickedSlide: true,
      pagination: {
        enabled: true,
        clickable: true,
      },
    },
    1280: {
      direction: "vertical",
      pagination: {
        enabled: true,
        clickable: true,
      },
    },
  }
}

const activeMovieId = ref<number>(0)
const activeMovie = computed(() => {
  if (activeMovieId.value === null) {
    return null
  }
  return movieInfo.movies.find((movie) => {
    return movie.kinopoiskId === activeMovieId.value
  })
})


function getInformation(swiperInstance: SwiperInstance) {
  activeMovieId.value = premiereStore.movies[swiperInstance.realIndex].kinopoiskId
  if (!movieInfo.movies.map(movie => movie.kinopoiskId).includes(activeMovieId.value)) {
    movieInfo.getMovieInfo(activeMovieId.value)
    movieInfo.getMovieImages(activeMovieId.value)
  }
}
</script>

<style lang="scss">
.movie-premieres {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.slider-wrapper--side {
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0px;
  width: 200px;
  height: 100vh;
  padding-right: 8px;

  @include break-xl {
    width: 180px;
  }

  @include break-lg {
    top: auto;
    bottom: 40px;
    width: 100%;
    height: 160px;
    padding-right: 0;
  }

  @include break-md {
    bottom: 32px;
  }

  @include break-sm {
    bottom: 16px;
  }

  .swiper {
    height: 100%;

    &-wrapper {
      width: 160px;

      @include break-xl {
        width: 140px
      }

      @include break-lg {
        width: 100%
      }
    }

    &-slide {
      width: 100%;
      height: 234px;
      background-color: #000000;
      transition: opacity 2s;
      border-radius: 6px;
      overflow: hidden;

      @include break-xl {
        height: 204px;
      }

      @include break-lg {
        width: 112.05px;
        height: 160px;
      }

      img {
        width: 100%;
        height: 100%;
        opacity: 0.3;
        transition: 1s;
      }

      &-active {
        opacity: 1;

        img {
          opacity: 1;
        }
      }
    }

    &-pagination-bullet {
      background: #00FFFF;
    }
  }
}
</style>