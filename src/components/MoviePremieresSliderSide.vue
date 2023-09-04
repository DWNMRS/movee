<!-- <template>
  <div class="slider-wrapper--side">
    <Swiper class="slider" v-if="init" @active-index-change="getInformation" :modules="modules"
    :direction="'vertical'" :slides-per-group="1" :slides-per-view="3.5" :pagination="swiperModulesOptions.pagination"
      :mousewheel="swiperModulesOptions.mousewheel" :space-between="40" :watch-overflow="false" :auto-height="true"
      :centered-slides="true" :loop="true" :slide-to-clicked-slide="true" :speed="1000">
      <SwiperSlide class="slider__slide" v-for="premiere of movies" :key="premiere.kinopoiskId">
        <img class="slider__slide-img" :src="premiere.posterUrlPreview"
          :alt="`постер из фильма '${activeMovie?.nameRu}'`">
      </SwiperSlide>
    </Swiper>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
// SWIPER
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Mousewheel, Pagination } from 'swiper/modules'
const modules = [Autoplay, Mousewheel, Pagination]
// SWIPER STYLES
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/mousewheel';
import 'swiper/scss/autoplay';

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

const activeMovieId = ref<number>(0)
const activeMovie = computed(() => {
  if (activeMovieId.value === null) {
    return null
  }
  return movieInfo.movies.find((movie) => {
    return movie.kinopoiskId === activeMovieId.value
  })
})

function getInformation(swiperInstance: any) {
  activeMovieId.value = premiereStore.movies[swiperInstance.realIndex].kinopoiskId
  if (!movieInfo.movies.map(movie => movie.kinopoiskId).includes(activeMovieId.value)) {
    movieInfo.getMovieInfo(activeMovieId.value)
    movieInfo.getMovieImages(activeMovieId.value)
  }
}

const props = defineProps({
  imagePaths: {
    type: Array as () => string[],
    default: []
  },
  movieName: {
    type: String,
    required: true,
    default: ''
  }
})


</script>

<style scoped lang="scss">
.slider-wrapper--side {
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0px;
  width: 200px;
  height: 100vh;
  padding-right: 8px;

  @include break-xl {
    height: calc(100vh - 80px);
  }

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
} -->
</style>